// import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDMnThPLjaXQLU7DXzERXSHTTVFYFDzvoA",
    authDomain: "social-bay-af7f3.firebaseapp.com",
    projectId: "social-bay-af7f3",
    storageBucket: "social-bay-af7f3.appspot.com",
    messagingSenderId: "803150776241",
    appId: "1:803150776241:web:d34f18c5ee5fbb6f775f90"
};

//initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

//get db variables
const db = firebaseApp.firestore();

//get db authentication
const auth = firebase.auth();

export {db,auth}