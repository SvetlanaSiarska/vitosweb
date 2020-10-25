import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';


console.log('firebase initializeApp-user')
firebase.initializeApp(firebaseConfig);

export default firebase;