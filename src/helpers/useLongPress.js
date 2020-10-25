import { useState, useEffect, useCallback } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);
  //const [timerId, setTimerId] =  useState(0);

  useEffect(() => {
    let timerId;
    timerId = -1;
    if (startLongPress) {      
      //clearTimeout(timerId);    
      console.log('create timerId')  
      timerId = setTimeout(()=> {
        clearTimeout(timerId);
        console.log('cleear in setTimeout', timerId)
        callback();
      } , ms);
      console.log('SettimerId', timerId);
    } else {
      
      if(timerId!==-1) {
        clearTimeout(timerId);
        console.log('XXXXcleear ', timerId)
      }  
     
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  const start = useCallback(() => {
    //console.log('setStartLongPress TRUE')
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    //console.log('setStartLongPress FALSE')
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}