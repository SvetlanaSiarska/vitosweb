import {  
    FETCH_PDFS_LINKS,   
    DELETE_PDF
} from './types.js'

import firebase from '../firebase/firebase';
import {getImageName} from '../helpers/helpers'


export const fetchPdfLinks = (refLink, newsUid) => {   
     
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
                data.push({url, uid, name, newsUid})    
              }).then(() => {
                //console.log('XXXXXXdata', data)
                dispatch({
                    type: FETCH_PDFS_LINKS,
                    payload: data
                })
              })            
            });
            if (res.items.length===0) {
                dispatch({
                    type: FETCH_PDFS_LINKS,
                    payload: []
                })
            }
            
          }).catch(function(error) {
            // Uh-oh, an error occurred!
          });
    }
};
    
export const deletePdf = (uid, name) => {
      
    return function(dispach) {
        var storageRef = firebase.storage();
        // Create a reference to the file to delete
        var desertRef = storageRef.ref(name); // ('images/desert.jpg');
        // Delete the file
        desertRef.delete().then(function() {
          // File deleted successfully
          dispach({
              type: DELETE_PDF,
              payload: uid
          })
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }
} 