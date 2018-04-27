
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import '../css/Login.css'

export default class Login extends React.Component {

    state = {
        userID: '',
        subjects: []
    }

    login = (response) => {
        console.log(response.profileObj) 
        const { email } = response.profileObj 
        const userID = email.split('.').join('')
        this.setState({ userID }) 
        this.props.history.push('/menu',{ userID })
        console.log(this.props)
    } 
 
    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        return (
            // this.props.history.push('/page-2')
            <div className='container' >
                <image />
                <button onClick={() => { this.login() }} >
                    เข้าสู่ระบบผ่าน Gmail
                </button>
                <GoogleLogin
                    clientId="243837215464-25n0r3msaqqrfco97c2u2ilceu9jcvpv.apps.googleusercontent.com" // ต้องเอา root ไปเปลี่ยนตรง original url ด้วยนะ 
                    buttonText="Login"
                    onSuccess={(response) => { /* this.responseGoogle(response) */ this.login(response) }}
                    onFailure={(response) => { this.responseGoogle(response) }}
                />
            </div>
        );
    }
}

