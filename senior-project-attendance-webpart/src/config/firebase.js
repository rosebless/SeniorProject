
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBJsLV775ojfv25BvJ1pHgsCjhfx6f8Qbw",
  authDomain: "seniorproject-7c5bd.firebaseapp.com",
  databaseURL: "https://seniorproject-7c5bd.firebaseio.com",
  projectId: "seniorproject-7c5bd",
  storageBucket: "seniorproject-7c5bd.appspot.com",
  messagingSenderId: "36169682779"
};

// const config = {
//     apiKey: "AIzaSyC9lmq0_zfypm163sb6OtQXLCVwUGrmrf0",
//     authDomain: "project-attendance.firebaseapp.com",
//     databaseURL: "https://project-attendance.firebaseio.com",
//     projectId: "project-attendance",
//     storageBucket: "project-attendance.appspot.com",
//     messagingSenderId: "1000125294069"
//   };

export default firebase.initializeApp(config);