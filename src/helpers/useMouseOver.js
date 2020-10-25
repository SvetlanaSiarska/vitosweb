import { useCallback, useRef } from 'react';

export default function useLongPress(callback1 = () => {},
                          callback2 = () => {}, ms = 300) {
 


  

  const mouseOver = useCallback(() => {    
    
      console.log('mouseOver');
    
      
  }, []);

  const mouseOut = useCallback(() => {    
    
    console.log('mouseOut');
  
    
}, []);


  return {
    onMouseOver: mouseOver,
    onMouseOut: mouseOut
  };
}