import { useState, useEffect, useCallback, useRef } from 'react';

export default function useLongPress(
                          callback1 = () => {},
                          callback2 = () => {}, 
                          callback3 = () => {},
                           ms = 300) {
 
  const [startTime, setStartTime] =  useState(0);
  const [endTime, setEndTime] =  useState(0);
  const [moveTime, setMoveTime] =  useState(0);
  const [moveStopTime, setMoveStopTime] =  useState(0);
  const startTimeRef = useRef(startTime); 
  const endTimeRef = useRef(endTime);
  const moveTimeRef = useRef(moveTime);
  const moveStopTimeRef = useRef(moveStopTime);
  let [WindowMousePosition, setWindowMousePosition] = useState({
    x: null,
    y: null
  });

 

  function handleMouseMove(e) {
    e.preventDefault();
    setWindowMousePosition({
      x: e.pageX,
      y: e.pageY
    });
  }

  function reset() {
    setEndTime(0);
    setStartTime(0);
    setMoveTime(0);    
    setMoveStopTime(0);      
  }

  useEffect(() => {
   
    window.addEventListener("mousemove", handleMouseMove);

    let timerId;
    timerId = -1;
    if(startTime>0 && endTime===0 && moveTime===0 ) {  
      console.log('AAAAA')    
      timerId = setTimeout(()=> {   

        if (startTimeRef.current>0 && 
          endTimeRef.current===0 && 
          moveTimeRef.current===0 ) {         
            
            callback2();
            reset();
        }         
      } , ms);
    }
    if (startTime>0 && 
      endTime>0 && 
      startTime<endTime && 
      moveTime===0) {      
      const diff = endTime-startTime;
      reset();

      if(diff<ms)
        callback1();
      else  if (diff>ms)
        callback2();             
    } 
    const n = Date.now();
    if(startTime>0 && moveTime>0 && n-moveTime>300) {

        callback3();
        reset();
    }
    return () =>  {
      clearTimeout(timerId); 
      window.removeEventListener("mousemove", handleMouseMove);

    }
    
  }, [callback1, callback2, callback3,
     ms, 
     startTime, endTime, moveTime, moveStopTime,
     WindowMousePosition]);  

  const start = useCallback((e) => {   
    e.preventDefault();
    console.log('start')

    startTimeRef.current = Date.now();
    endTimeRef.current = 0;
    moveTimeRef.current = 0;
    moveStopTimeRef.current = 0;
    setStartTime(startTimeRef.current);
    setEndTime(endTimeRef.current);
    setMoveTime(moveTimeRef.current);
    setMoveStopTime(moveStopTimeRef.current);
  }, []);


  const stop = useCallback((e) => { 
    e.preventDefault();
    console.log('stop')
    endTimeRef.current = Date.now();
    setEndTime(endTimeRef.current);
   
  }, []);

  const move = useCallback((e) => {
    e.preventDefault();

    const n = Date.now();
    if(startTime>0 && moveTime===0){   
      moveTimeRef.current = Date.now();
      setMoveTime(moveTimeRef.current);
    }  else if(moveTime>0 && n - moveTime>200) {     
      moveStopTimeRef.current = Date.now();
      setMoveStopTime(moveStopTimeRef.current);
    }
  }, [moveTime, startTime]);


  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseOut : stop,
    onMouseLeave: stop,
    onDrag: move,
  };
}