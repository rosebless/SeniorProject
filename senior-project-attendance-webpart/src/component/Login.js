
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import firebase from '../config/firebase'
import Header from './Header'
import '../css/Login.css'

export default class Login extends React.Component {

    state = {
        width: 0,
        height: 0
    }

    componentDidMount = () => {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    login = async (response) => {
        if (response) {
            firebase.auth(true)
            console.log(response.profileObj)
            const { email, imageUrl } = response.profileObj
            const professorID = email
            const photoUrl = imageUrl
            // this.setState({ professorID }) 
            const [professorKey, professorsName] = await this.getProfessorKey(professorID, photoUrl)
            console.log(professorKey)
            this.props.history.push('/menu', { professorKey, professorID, professorsName, photoUrl })
            console.log(this.props)
        } else {
            firebase.auth(false)
        }

    }

    getProfessorKey = (professorID, photoUrl) => new Promise((resolve, reject) => {
        firebase.database().ref('/Professor').once('value').then(snapshot => {
            const result = snapshot.val()
            let key = Object.keys(result).filter(key => result[key].professorID == professorID)[0]
            let name = ''
            if (key) {
                name = result[key].name
            } else {
                const { key: keyNew } = firebase.database().ref('/Professor').push({ professorID, photoUrl })
                key = keyNew
            }
            resolve([key, name]);
        })
    })


    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        const height = this.state.height - 20
        const width = this.state.width - 20
        return (
            // this.props.history.push('/page-2')
            <div className='container' style={{
                height,
                width,
                backgroundSize: width
            }} >
                <Header pageName={'เข้าสู่ระบบ'} height={height} width={width} />
                <div id='div' style={{ height: 16.25 / 19 * height, width, justifyContent: 'flex-start', alignItems: 'center' }} >
                    <img style={{ width: 0.2 * width }}
                        src={require('../photo/login.png')} />
                    <GoogleLogin
                        className='button'
                        style={{ height: 1 / 8 * height, width: 0.5 * width }}
                        style={{
                            height: 1 / 8 * height, width: 0.5 * width,
                            borderRadius: 0.2 * 1 / 8 * height, marginTop: 0.2 * 1 / 8 * height,
                            fontSize: 0.5 * 1 / 8 * height
                        }}
                        clientId="243837215464-25n0r3msaqqrfco97c2u2ilceu9jcvpv.apps.googleusercontent.com" // ต้องเอา root ไปเปลี่ยนตรง original url ด้วยนะ 
                        buttonText="เข้าสู่ระบบผ่าน Gmail"
                        onSuccess={(response) => { /* this.responseGoogle(response) */ this.login(response) }}
                        onFailure={(response) => { this.responseGoogle(response) }}
                    />
                </div>
            </div>
        );
    }
}

