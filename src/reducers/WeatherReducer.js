import {
  FETCH_WEATHER
  } from '../actions/types';
  
  const INITIAL_STATE = {};
  
  const test = {'01d': 'XXX','02d': 'XXX', '03d': 'XXX', '04d': 'XXX',
  '09d': 'XXX', '10d': 'XXX', '11d': 'XXX', '13d': 'XXX', '50d': 'XXX',
  '01n': 'XXX','02n': 'XXX', '03n': 'XXX', '04n': 'XXX',
  '09n': 'XXX', '10n': 'XXX', '11n': 'XXX', '13n': 'XXX', '50n': 'XXX'};
  
  export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
      case FETCH_WEATHER:  
        return  { ...action.payload }  
        //const temperature=20;
        //return { temperature} 
    default:
        return state;
    }
  };
  
