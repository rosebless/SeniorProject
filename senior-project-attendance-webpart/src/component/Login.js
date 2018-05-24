
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import firebase from '../config/firebase'
import Header from './Header'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
// import '../css/Login.css' 

export default class Login extends React.Component {

    // state = {
    //     width: 0,
    //     height: 0
    // }

    // componentDidMount = () => {
    //     this.updateWindowDimensions();
    //     window.addEventListener('resize', this.updateWindowDimensions);
    // }

    // componentWillUnmount = () => {
    //     window.removeEventListener('resize', this.updateWindowDimensions);
    // }

    // updateWindowDimensions = () => {
    //     this.setState({ width: window.innerWidth, height: window.innerHeight });
    // }

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
            const result = snapshot.val() || {}
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
        // const height = this.state.height - 20
        // const width = this.state.width - 20
        return (
            // this.props.history.push('/page-2')
            <div>
                <Header pageName={'เข้าสู่ระบบ'} />
                <Grid container spacing={24}>
                    <Grid item xs />
                    <Grid item xs >
                        <img id='logo' src={require('../photo/logo.png')} />
                    </Grid>
                    <Grid item xs />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs />
                    <Grid item xs={5} >
                        <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }} 
                            style={{ width: '100%', color: 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '2vw', borderRadius: '1vw', padding: '1vw', border: 'thick solid rgb(15, 111, 198)' }}
                            onClick={() => setTimeout(()=>{this.buttonG.signIn()},300) } >
                            เข้าสู่ระบบผ่าน Gmaile
                        </Button>
                    </Grid>
                    <Grid item xs />
                </Grid>
                <GoogleLogin
                    clientId="243837215464-25n0r3msaqqrfco97c2u2ilceu9jcvpv.apps.googleusercontent.com" // ต้องเอา root ไปเปลี่ยนตรง original url ด้วยนะ 
                    buttonText=''
                    onSuccess={(response) => { this.login(response) }}
                    onFailure={(response) => { this.responseGoogle(response) }}
                    ref={input => this.buttonG = input} tag='div'
                    style={{ width: 0, height: 0 }} hidden
                />
                {/* <div className='container' >
                    <div>
                        <img id='logo' src={require('../photo/logo.png')} />
                    </div>
                    <GoogleLogin
                        clientId="243837215464-25n0r3msaqqrfco97c2u2ilceu9jcvpv.apps.googleusercontent.com" // ต้องเอา root ไปเปลี่ยนตรง original url ด้วยนะ 
                        buttonText=''
                        onSuccess={(response) => { this.login(response) }}
                        onFailure={(response) => { this.responseGoogle(response) }}
                        ref={input => this.buttonG = input} tag='div'
                        style={{ width: 0, height: 0 }} hidden
                    />
                    <Button variant="outlined" component="span"
                        onClick={() => this.buttonG.signIn()} >
                        เข้าสู่ระบบผ่าน Gmaile
                    </Button>
                </div> */}
            </div>
        );
    }
}

