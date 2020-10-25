import { AUTH_LOG_IN,
    AUTH_LOG_OUT } from './types.js'


export const auth = (user) => {
    
    let userUid = '';
    if(user) 
        userUid = user.uid;
    if (user)
        return {
            type: AUTH_LOG_IN, 
            payload:  userUid     
        };
    else 
        return {
            type: AUTH_LOG_OUT,   
        }; 
};

