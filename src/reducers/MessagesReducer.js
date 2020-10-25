import {
  ADD_MESSAGE,
  FETCH_MESSAGES,
  FETCH_MESSAGE,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
  FETCH_NEWS_IMAGES,
  FETCH_PDFS_LINKS,
  DELETE_PDF
  } from '../actions/types';
  
  const INITIAL_STATE = {imageReff:[], editedMessage: {}, changed:false, all: {}};
  
  export default (state = INITIAL_STATE, action) => {

    var pdfs;
    switch (action.type) {
      case ADD_MESSAGE:  
      case DELETE_MESSAGE:  
      case UPDATE_MESSAGE:          
        return  {...state, changed: true }  
      case FETCH_MESSAGES: 
       return  { ...state,  all: action.payload, changed: false}  
       case FETCH_MESSAGE:  
         return { ...state, editedMessage: action.payload, changed: false}
    case FETCH_NEWS_IMAGES:
          const imageRefs = action.payload;
          return {...state, imageRefs:[...imageRefs]}
    case FETCH_PDFS_LINKS: 
        pdfs = action.payload;
        //console.log('FETCH_PDFS_LINKS', action.payload)
          return {...state, pdfs:[...pdfs]}
    case DELETE_PDF:
        pdfs = state.pdfs.filter((value)=> {
          return value.uid!==action.payload;
        });
        return {...state, pdfs:[...pdfs]}
    default:
        return state;
    }
  };
  
