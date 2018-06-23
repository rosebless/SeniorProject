import firebase from 'firebase'

// const config = {
//     apiKey: "AIzaSyBJsLV775ojfv25BvJ1pHgsCjhfx6f8Qbw",
//     authDomain: "seniorproject-7c5bd.firebaseapp.com",
//     databaseURL: "https://seniorproject-7c5bd.firebaseio.com",
//     projectId: "seniorproject-7c5bd",
//     storageBucket: "seniorproject-7c5bd.appspot.com",
//     messagingSenderId: "36169682779"
// }; 

const config = {
  apiKey: "AIzaSyC9lmq0_zfypm163sb6OtQXLCVwUGrmrf0",
  authDomain: "project-attendance.firebaseapp.com",
  databaseURL: "https://project-attendance.firebaseio.com",
  projectId: "project-attendance",
  storageBucket: "project-attendance.appspot.com",
  messagingSenderId: "1000125294069"
};

const fb = firebase.initializeApp(config)

const refConfig = fb.database().ref('/Config')
refConfig.once('value', snapshot => {
  if (!snapshot.val()) {
    const con = {
      'start-term': {
        'term-1': {
          'comment': 'dd-mm-yyyy',
          'date': '1-8-2560'
        },
        'term-2': {
          'comment': 'dd-mm-yyyy',
          'date': '1-1-2561'
        },
        'term-3': {
          'comment': 'dd-mm-yyyy',
          'date': '1-6-2561'
        }
      }
    }
    refConfig.set(con)
  }
})
const initial = {
  'initial': 'create for initalize'
}

const refProfessor = fb.database().ref('/Professor')
refProfessor.once('value', snapshot => {
  if (!snapshot.val()) refProfessor.set(initial)
})

const refSubject = fb.database().ref('/Subject')
refSubject.once('value', snapshot => {
  if (!snapshot.val()) refSubject.set(initial)
})

export default fb;
