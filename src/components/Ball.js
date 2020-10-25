import React from 'react'
import styled from '@emotion/styled';

export const Ball=
()=>
{
  let offsetX,offsetY
  const move=e=>
  {
    console.log('onTouchStart move', e.pageX)
    const el=e.target
    el.style.left = `${e.pageX-offsetX}px`
    el.style.top = `${e.pageY-offsetY}px`
  }


  const add=e=>
  {
    const el=e.target
    offsetX=e.clientX-el.getBoundingClientRect().left
    offsetY=e.clientY-el.getBoundingClientRect().top
    el.addEventListener('mousemove',el)
  }


  
  const addtouch=e=>
  {
     
    const touch = e.touches[0];
    const el=e.target
    offsetX=touch.clientX-el.getBoundingClientRect().left
    offsetY=touch.clientY-el.getBoundingClientRect().top

   // console.log('onTouchStart addd', el.getBoundingClientRect())
   // console.log('onTouchStart offsetX', offsetX)

    el.addEventListener('touch',move)
  }

  const remove=e=>{
    const el=e.target
    el.removeEventListener('mousemove',move)
  }
  const removetouch=e=>{
    const el=e.target
    el.removeEventListener('touch',move)
  }

  const Wrapper=styled.div`
  width: 50px;
  height: 50px;
  border-radius: 29px;
  box-shadow: 0 0 6px;
  position: absolute;
  top: 40px;
  left: 227px;
  background-color: rgb(0,0,0,0.5);
  cursor:pointer;
  `
  //const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
       
  
  return (
    <Wrapper onMouseDown={add} onMouseUp={remove}/>
  ) 
  
}
