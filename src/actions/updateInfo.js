import { FETCH_INFO
} from './types.js'

import firebase from '../firebase/firebase';

export const updateInfoFirebase = (type) => {   
 
    return function(dispatch) {
        const timestamp = Date.now();
        var docRef = firebase.firestore().collection("data").doc("info");
        docRef.set({type, timestamp})
        .then(function() {
            //console.log("Document successfully written!");
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    const time = formatDiffTime(Math.round((Date.now()-doc.data().timestamp)/1000))
             
                    dispatch({
                        type: FETCH_INFO,
                        payload: {...doc.data(), time}
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
  };

  const formatDiffTime= (sec)=> {
    let textDiff = "";
    if(sec>=0 && sec<60) 
        textDiff = `${sec} sec`;
    else if (sec>=60 && sec<60*60) { // till 40min
        const min = Math.round(sec/60);
        textDiff = `${min} min`;
    } else if (sec>=60*60 && sec<60*60*24) { // till one day
        const hod = Math.round(sec/60/60);
        textDiff = `${hod} hrs`;
    }  else if (sec>=60*60*24 && sec<60*60*24*2)  {
        const days = Math.round(sec/60/60/24);
        textDiff = `${days} day`;
    } else {
        const days = Math.round(sec/60/60/24);
        textDiff = `${days} days`;
    }
    return textDiff ;
  }


  export const fetchInfoFirebase = () => {   
 
    return function(dispatch) {
        
        var docRef = firebase.firestore().collection("data").doc("info");
        docRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                const time = formatDiffTime(Math.round((Date.now()-doc.data().timestamp)/1000))
                dispatch({
                    type: FETCH_INFO,
                    payload: {...doc.data(), time}
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
    }
  };

