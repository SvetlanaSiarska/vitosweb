import {  
     FETCH_MESSAGES,
     FETCH_MESSAGE,
     ADD_MESSAGE,
     DELETE_MESSAGE,
     UPDATE_MESSAGE,
     FETCH_NEWS_IMAGES
} from './types.js'
import {getImageName} from '../helpers/helpers'
import firebase from '../firebase/firebase';

const convertDateToTimestamp = (date) => {
    var params = date.split("-");
    //console.log('params', params)
    //console.log('XXX', `${params[2]}/${params[1]}/${params[0]}`)

    const dateOrderObject = new Date(`${params[2]}/${params[1]}/${params[0]}`);
    //console.log('dateOrderObject', dateOrderObject)
    const timestamp = dateOrderObject.getTime();
    return timestamp;
}
export const addMessageFirebase = (data) => {   
 
    return function(dispatch) {

        const timestamp = Date.now();      
        const dateOrder = convertDateToTimestamp(data.date);
        firebase.firestore().collection("messages").add({...data, dateOrder, timestamp})
        .then(function(docRef) {
            dispatch({
                type: ADD_MESSAGE
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
};

export const updateMessageFirebase = (uid, data) => {   
 
    return function(dispatch) {
      
        const timestamp = Date.now();
        const dateOrder = convertDateToTimestamp(data.date);
        firebase.firestore().collection("messages").doc(uid)
        .update({...data, dateOrder, timestamp})
        .then(function(docRef) {
            dispatch({
                type: UPDATE_MESSAGE,
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
};


export const fetchMessagesFirebase = () => {   
 
    //console.log('fetchMessagesFirebase')
    return function(dispatch) {
        firebase.firestore().collection("messages").orderBy("dateOrder").get()
        .then(function(querySnapshot) {
            var data = {};
               querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                data[doc.id] = doc.data();
                //console.log(doc.id, " => ", doc.data());
            });
            //console.log('XXXXXXXdata', data);
            dispatch({
                type: FETCH_MESSAGES,
                payload: data
            })
        });
    }
};

export const fetchNewsLinks = (refLink, galleryUid) => {   
     
    return function(dispatch) {
        var listRef = firebase.storage().ref(refLink);        
        listRef.listAll().then(function(res) {          
            res.prefixes.forEach(function(folderRef) {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
              console.log('folderRef', folderRef)
            });
            const data = [];
            res.items.forEach(function(itemRef) {
              // All the items under listRef.             
              itemRef.getDownloadURL()
              .then((url)=> {
                // Insert url into an <img> tag to "download"
                const uid =  getImageName(itemRef.name);
                const name = itemRef.name;
                data.push({url, uid, name, galleryUid})    
              }).then(() => {
                //console.log('XXXXXXdata', data)
                dispatch({
                    type: FETCH_NEWS_IMAGES,
                    payload: data
                })
              })            
            });
            if (res.items.length===0) {
                dispatch({
                    type: FETCH_NEWS_IMAGES,
                    payload: []
                })
            }
            
          }).catch(function(error) {
            // Uh-oh, an error occurred!
          });
    }
};

export const fetchMessageFirebase = (uid) => {   
 
    return function(dispatch) {
        var docRef = firebase.firestore().collection("messages").doc(uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: {...doc.data(), uid}
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

export const deleteMessageFirebase = (uid) => {

    return function(dispach) {
        firebase.firestore().collection("messages").doc(uid).delete()
        .then(function() {
            console.log("Document successfully deleted!");
            dispach({
                type: DELETE_MESSAGE,
            })
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}


