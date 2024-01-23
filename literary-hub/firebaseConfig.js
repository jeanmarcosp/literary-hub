import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDego97gDpwmIZjjBa_eR8pNkquCwHFibA",
    authDomain: "literary-hub.firebaseapp.com",
    projectId: "literary-hub",
    storageBucket: "literary-hub.appspot.com",
    messagingSenderId: "1001417849934",
    appId: "1:1001417849934:web:0c7e1ca4d7505e27b3171f",
    measurementId: "G-SMRNVT7JGC"
  };

firebase.initializeApp(firebaseConfig)


export { firebase };