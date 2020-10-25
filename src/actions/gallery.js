import {  
    FETCH_GALLERY_IMAGES,
    FETCH_GALLERIES,
    FETCH_GALLERIES_OVERVIEW,
    ADD_GALLERY_FIREBASE,
    UPDATE_GALLERY_FIREBASE,
    FETCH_GALLERY_FIREBASE,
    DELETE_GALLERY,
    DELETE_IMAGE,
} from './types.js'

import firebase from '../firebase/firebase';
import {getImageName} from '../helpers/helpers'



export const addGallery = (data) => {   
 
    return function(dispatch) {

        const timestamp = Date.now();      
       
        firebase.firestore().collection("galleries").add({...data, timestamp})
        .then(function(docRef) {
            dispatch({
                type: ADD_GALLERY_FIREBASE
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
};

export const updateGallery = (uid, data) => {   
 
    return function(dispatch) {
             
        firebase.firestore().collection("galleries").doc(uid)
        .update(data)
        .then(function(docRef) {
            dispatch({
                type: UPDATE_GALLERY_FIREBASE,
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
};

export const fetchGalleriesNames = () => { 
 
    return function(dispatch) {
        firebase.firestore().collection("galleries").orderBy("timestamp").get()
        .then(function(querySnapshot) {
            var data = {};
               querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                data[doc.id] = doc.data();
                //console.log(doc.id, " => ", doc.data());
            });
            //console.log('data', data);
            dispatch({
                type: FETCH_GALLERIES,
                payload: data
            })
        });
    }
};

export const fetchGalleriesOverview = () => { 
 
    return function(dispatch) {
        firebase.firestore().collection("galleries").orderBy("timestamp").get()
        .then(function(querySnapshot) {
            var data = {};
               querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //data[doc.id] = doc.data();
                //console.log(doc.id, " => ", doc.data());

                const refLink = `images/${doc.id}`;
                var listRef = firebase.storage().ref(refLink);        
                listRef.listAll().then(function(res) {          
                    //const dataImages = [];
                    //var link = '';
                    res.items.forEach(function(itemRef) {                     
                      // All the items under listRef.             
                      itemRef.getDownloadURL()
                      .then((url)=> {
                        // Insert url into an <img> tag to "download"
                        const uid =  getImageName(itemRef.name);
                         //dataImages.push({url, uid, name})  
                        if(uid=== doc.data().titleImage ) {
                            //link = url;
                            const {title} = doc.data()
                            //data[doc.id] = {title, url};
                            data = { 
                                ...data,
                                [doc.id]: {title, url}
                              }
                        } 
                      })           
                    });
                    console.log('FETCH_GALLERIES_OVERVIEW', data);
                    dispatch({
                        type: FETCH_GALLERIES_OVERVIEW,
                        payload: data
                    })                
                    
                                       
                  }).catch(function(error) {
                    // Uh-oh, an error occurred!
                  });
                
            });
            
           
        });
    }
};

export const fetchGallery = (uid) => {   
 
    return function(dispatch) {
        var docRef = firebase.firestore().collection("galleries").doc(uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                dispatch({
                    type: FETCH_GALLERY_FIREBASE,
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



export const fetchImagesLinks = (refLink, galleryUid) => {   
     
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
                    type: FETCH_GALLERY_IMAGES,
                    payload: data
                })
              })            
            });
            if (res.items.length===0) {
                dispatch({
                    type: FETCH_GALLERY_IMAGES,
                    payload: []
                })
            }
            
          }).catch(function(error) {
            // Uh-oh, an error occurred!
          });
    }
};

    
export const deleteGallery = (uid, ref) => {
    
  
    return function(dispach) {
        firebase.firestore().collection("galleries").doc(uid).delete()
        .then(function() {
            console.log("Document successfully deleted!");            
            // Create a reference to the files to delete
            var listRef = firebase.storage().ref(ref); 
            listRef.listAll().then(function(res) {          
                res.items.forEach(function(itemRef) {
                const imageRef =  `${ref}/${itemRef.name}`;
                firebase.storage().ref(imageRef).delete();
                })          
            });
                            
            dispach({
                type: DELETE_GALLERY,
            })

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
} 

export const deleteImage = (uid, name) => {
      
    return function(dispach) {
        var storageRef = firebase.storage();
        // Create a reference to the file to delete
        var desertRef = storageRef.ref(name); // ('images/desert.jpg');
        // Delete the file
        desertRef.delete().then(function() {
        // File deleted successfully
        dispach({
            type: DELETE_IMAGE,
            payload: uid
        })
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }
} 