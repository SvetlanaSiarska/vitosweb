import { 
  SEND_REGISTRATION, 
  SEND_REGISTRATION_START,
  INIT_REGISTRATION_FORM}  from '../actions/types';

  
  const INITIAL_STATE = {result:'', error:'', loading:false};
  
  export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
      case INIT_REGISTRATION_FORM: 
        return INITIAL_STATE;
      case SEND_REGISTRATION:  
        const {result, error} = action.payload;
        return  {...state, result, error, loading:false }        
      case SEND_REGISTRATION_START: 
        return  {...state, loading:true } 
    default:
        return state;
    }
  };
  
