import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA0WFmOzyjAlts6uxRNlWW3dEjSBNnMJ3I",
    authDomain: "whine-d6334.firebaseapp.com",
    databaseURL: "https://whine-d6334.firebaseio.com",
    projectId: "whine-d6334",
    storageBucket: "whine-d6334.appspot.com",
    messagingSenderId: "836085222407",
    appId: "1:836085222407:web:65e0944ec9a9744bb12ea2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db =  firebaseApp.firestore();
  const auth = firebase.auth();
  const fb = firebase;

  export { fb, db, auth };