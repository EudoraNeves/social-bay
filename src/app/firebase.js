// import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //auth
import 'firebase/compat/firestore'; //db
import { getStorage } from 'firebase/storage'; //storage

const firebaseConfig = {
    apiKey: "AIzaSyDMnThPLjaXQLU7DXzERXSHTTVFYFDzvoA",
    authDomain: "social-bay-af7f3.firebaseapp.com",
    projectId: "social-bay-af7f3",
    storageBucket: "social-bay-af7f3.appspot.com", //for file storage
    messagingSenderId: "803150776241",
    appId: "1:803150776241:web:d34f18c5ee5fbb6f775f90"
};

//initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

//get db variables
const db = firebaseApp.firestore();

//get db authentication
const auth = firebase.auth();

//initialize cloud storage and get a reference to the service
const storage = getStorage(firebaseApp);

export {db,auth, storage}