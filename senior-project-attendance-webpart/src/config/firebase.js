
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBJsLV775ojfv25BvJ1pHgsCjhfx6f8Qbw",
    authDomain: "seniorproject-7c5bd.firebaseapp.com",
    databaseURL: "https://seniorproject-7c5bd.firebaseio.com",
    projectId: "seniorproject-7c5bd",
    storageBucket: "seniorproject-7c5bd.appspot.com",
    messagingSenderId: "36169682779"
};

export default firebase.initializeApp(config);