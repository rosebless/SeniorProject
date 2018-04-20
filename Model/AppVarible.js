import { Dimensions } from 'react-native';
import firebase, { firestore } from 'firebase'

export default class ApplicationVarible {
    static appVarible = {
        logOn: {
            userID: '',
            picUrl: 'https://raw.githubusercontent.com/rosebless/SeniorProject/master/pics/profile1.png',           // รูปของอาจารย์ที่ log in อยู่
            name: 'Wanchanok Jampum',           // ชื่อของอาจารย์ที่ log in อยู่
            phone: '',           // เบอร์โทรของอาจารย์ที่ log in อยู่
            userID: '',           // เมลของอาจารย์ที่ log in อยู่
            subjects: []             // รหัสรายวิชาที่อาจารย์รับผิดชอบ ของอาจารย์ที่ log in อยู่
        },

        navigationSaved: {
            login: {
                status: false,   // false = saving ,  true = saved
                navigate: ''      //(this.props.navigation on Login.js),         เก็บ navigation เพื่อใช้สำหรับ ไปหน้าต่างๆของ NavigatorLogin ได้   
            },
            main: {
                status: false,   // false = saving ,  true = saved
                navigate: ''      //(this.props.navigation on MainPage.js),      เก็บ navigation เพื่อใช้สำหรับ ไปหน้าต่างๆของ NavigatorMain ได้  
            },
            subject: {
                status: false,   // false = saving ,  true = saved
                navigate: '',     //(this.props.navigation on SubjectManage.js), เก็บ navigation เพื่อใช้สำหรับ ไปหน้าต่างๆของ NavigatorSubject ได้
                focus: ''         //this is the selected subject code  
            },
            scanning: {
                status: false,   // false = saving ,  true = saved
                navigate: '',     //(this.props.navigation on ScanningPage.js),  เก็บ navigation เพื่อใช้สำหรับ ไปหน้าต่างๆของ NavigatorScanning ได้  
                focus: ''         //this is the selected subject code  
            },
            dashboard: {
                status: false,   // false = saving ,  true = saved
                navigate: '',    //(this.props.navigation on SummaryPage.js)    เก็บ navigation เพื่อใช้สำหรับ ไปหน้าต่างๆของ NavigatorSummary ได้ 
                focus: ''         //this is the selected subject code   
            }
        },

        deviceSize: {
            deviceHeight: 100,
            deviceWidth: 100
        },

        firebase: 'firebase'

    }

    static setFirebase() {
        var config = {
            apiKey: "AIzaSyBJsLV775ojfv25BvJ1pHgsCjhfx6f8Qbw",
            authDomain: "seniorproject-7c5bd.firebaseapp.com",
            databaseURL: "https://seniorproject-7c5bd.firebaseio.com",
            projectId: "seniorproject-7c5bd",
            storageBucket: "seniorproject-7c5bd.appspot.com",
            messagingSenderId: "36169682779"
        };
        firebase.initializeApp(config);
        this.appVarible.firebase = firebase
        // firebase.auth().
    }

    static setDeviceSize() {
        this.appVarible.deviceSize.deviceHeight = Dimensions.get('window').height;
        this.appVarible.deviceSize.deviceWidth = Dimensions.get('window').width;
    }

    static setAppVarible(setParameter, value) {
        this.appVarible[setParameter] = value
    }

    static setLogOn(setParameter, value) {
        this.appVarible.logOn[setParameter] = value
    }

    static setNavigation(setParameter, value) {
        this.appVarible.navigationSaved[setParameter] = value
    }

    static setNavigationFocus(setParameter, value) {
        this.appVarible.navigationSaved[setParameter].focus = value
    }

    // static setNavigationLogin(value) { this.appVarible.navigationSaved.login = value }
    // static setNavigationMain(value) { this.appVarible.navigationSaved.main = value } 
    // static setNavigationSubject(value) { this.appVarible.navigationSaved.subject = value }
    // static setNavigationScainning(value) { this.appVarible.navigationSaved.scanning = value }
    // static setNavigationDashboard(value) { this.appVarible.navigationSaved.dashboard = value } 



}   
