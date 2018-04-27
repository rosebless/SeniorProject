
import React from 'react' 
import firebase from 'firebase'

export default class Menu extends React.Component { 

    constructor(props) {
        super(props) 
    }

    toNextPage = (page) => {
       const { userID } = this.props.history.location.state
        this.props.history.replace('/'+page,{ userID, mode: page }) 
        console.log(userID) 
        console.log(firebase)
    }

    render() {
        console.log(this.props)
        console.log(this.props.history.location.state.userID)
        return (
            // this.props.history.push('/page-2')
            <div className='container' >
                <button onClick={() => { this.toNextPage('import') }} >
                    เพิ่มรายวิชา
                </button>
                <button onClick={() => { this.toNextPage('export') }} >
                    ส่งออกข้อมูล
                </button> 
            </div>
        );
    }
} 

var config = {
    apiKey: "AIzaSyBJsLV775ojfv25BvJ1pHgsCjhfx6f8Qbw",
    authDomain: "seniorproject-7c5bd.firebaseapp.com",
    databaseURL: "https://seniorproject-7c5bd.firebaseio.com",
    projectId: "seniorproject-7c5bd",
    storageBucket: "seniorproject-7c5bd.appspot.com",
    messagingSenderId: "36169682779"
};
firebase.initializeApp(config);

export var fb = firebase

