import firebase from 'firebase/app';
//SERVICES
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAprX9twa4EG52bFcthuk6AahostU6RPQk",
    authDomain: "dojosite-2d345.firebaseapp.com",
    projectId: "dojosite-2d345",
    storageBucket: "dojosite-2d345.appspot.com",
    messagingSenderId: "943319842051",
    appId: "1:943319842051:web:9c7067af7cb31a27db7d36"
  };

//Init Firebase
firebase.initializeApp(firebaseConfig);

//Init Services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//Setup Timestamp Function
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp};