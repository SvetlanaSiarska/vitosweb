import { SEND_REGISTRATION, 
  SEND_REGISTRATION_START,
  INIT_REGISTRATION_FORM
}  from './types.js'

import firebase from '../firebase/firebase';


export const initRegistration = () => {       
  return {
    type: INIT_REGISTRATION_FORM
  };    
};


export const sendRegistrationEmail = (data) => {

    return function(dispatch, getState) {
      const functions = firebase.functions();
      const callableSendMail = functions.httpsCallable('submitMessage');
      
      dispatch({
        type: SEND_REGISTRATION_START
      }); 

     
      callableSendMail(data)     
      .then((result) => {
       
        const error = false;        
        dispatch({
          type: SEND_REGISTRATION,
          payload: {result, error}
        }); 
      })   
      .catch((error) => {    
        
        dispatch({
          type: SEND_REGISTRATION,
          payload: {result:'', error}
        }); 
      });
       
    };
  };
  
export default sendRegistrationEmail;