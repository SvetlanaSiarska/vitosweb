import { useState, useEffect, useCallback, useRef } from 'react';

export default function useTouches(
                          callback3 = () => {},
                          callback2 = () => {},
                          callback = () => {},
                          ms = 300) {
 
  const [swiped, setSwiped] =  useState(false);
  const [timer, setTimer] =  useState(null);
  const timerRef = useRef(timer); 

  const [swiping, setSwiping] =  useState(false);
  const [longTouch, setLongTouch] =  useState(false);
  const [startTime, setStartTime] =  useState(0);
  let [swipe, setSwipe] = useState({
    x: null,
    y: null
  });

  function reset() {
    setSwiped(false);
      setSwiping(false);
      setSwipe({
        x: null,
        y: null
      });  
      setStartTime(0);
      setLongTouch(false)
      setTimer(null);
  }

  useEffect(() => {
   
    if(swiped) {
      callback();
      reset();
    } 
    if(longTouch) {
      console.log('useEffect, 2')
      callback2();
      reset();
      clearTimeout(timer)

    }
       
    return () =>  {
    }
    
  }, [callback,callback2,
     ms, swiped, longTouch, timer]);  


  const _onTouchStart = useCallback((e) => {  
    e.preventDefault();
    console.log('_onTouchStart')
    const touch = e.touches[0];
    setSwipe({
      x: touch.clientX,
      y: touch.clientY
    });
    setSwiped(false);
    setStartTime(Date.now());
   
    const timerId = setTimeout(()=> {   
        console.log('timerRef', timerRef)
        if(timerRef) {
          callback2();
          reset();
        }     
    } , ms);
    setTimer(timerId);
    console.log('timer start', timerId)

  }, [callback2, ms, timerRef]);


  const _onTouchMove = useCallback((e) => { 
    e.preventDefault();
    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      setSwiping(true);
    }

  }, []);

  const _onTouchEnd = useCallback((e) => {    
    e.preventDefault();
    //console.log('_onTouchEnd')
    const minDistance = 10;
    const touch = e.changedTouches[0];
    const absY = Math.abs(touch.clientY - swipe.y);
    const absX = Math.abs(touch.clientX - swipe.x);
    console.log('absY', absY)
    console.log('absX', absX)
    if (swiping===true && absY > minDistance ) {
      setSwiped(true);
      //console.log('clearTimeout', timer)
      clearTimeout(timer)
      setTimer(null)
    } else if (Date.now()-startTime<ms) {
      //setLongTouch(true);
      //console.log('clearTimeout', timer)
      clearTimeout(timer)
      setTimer(null)
      callback3();
      reset();
    }
     

    setSwiping(false);
    setSwipe({
      x: null,
      y: null
    });


  }, [swipe, swiping, startTime, ms, timer, callback3]);

  return {
    onTouchStart:_onTouchStart,
    onTouchMove:_onTouchMove,
    onTouchEnd: _onTouchEnd,
  };
}