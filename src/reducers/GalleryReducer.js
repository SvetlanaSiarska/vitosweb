import {
  FETCH_GALLERIES,
  FETCH_GALLERIES_OVERVIEW,
  FETCH_GALLERY_FIREBASE,
  ADD_GALLERY_FIREBASE ,
  UPDATE_GALLERY_FIREBASE ,
  FETCH_GALLERY_IMAGES,
  DELETE_GALLERY,
  DELETE_IMAGE

  } from '../actions/types';
  
  const INITIAL_STATE = {init: false, overview:{}};
  
  export default (state = INITIAL_STATE, action) => {

    //console.log('GALLERY_REDUCER', action.type)
    var imageRefs;
    switch (action.type) {
      //case DELETE_MESSAGE: 
      case ADD_GALLERY_FIREBASE:        
      case UPDATE_GALLERY_FIREBASE:   
      case DELETE_GALLERY: 
        return  {...state, changed: true } 
      case FETCH_GALLERIES_OVERVIEW: 
      console.log('REDUCERR', action.payload)
        return  { ...state, overview: action.payload}  
      case FETCH_GALLERIES: 
       return  { ...state, all: action.payload, changed: false}  
      case FETCH_GALLERY_FIREBASE:  
         return { ...state, editedGallery: action.payload, changed: false}
      case FETCH_GALLERY_IMAGES:
        imageRefs = action.payload;
         //console.log('FETCH_GALLERY_IMAGES', imageRefs)
        return {...state, imageRefs:[...imageRefs]}
    case DELETE_IMAGE:
        imageRefs = state.imageRefs.filter((value)=> {
        return value.uid!==action.payload;
      });
      return {...state, imageRefs:[...imageRefs]}
    default:
        //console.log('DEF_REDUCER_GALLERIES', state)
        return state;
    }
  };
  
