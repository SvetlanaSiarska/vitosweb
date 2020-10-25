import {
  FETCH_INFO
  } from '../actions/types';
  
  const INITIAL_STATE = {};
  
  export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
      case FETCH_INFO:  
        return  { ...action.payload }  
       //const temperature=20;
        //return { temperature} 
    default:
        return state;
    }
  };
  
