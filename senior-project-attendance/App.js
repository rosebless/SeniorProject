import React from 'react';
import { Dimensions } from 'react-native';
import Navigators from './src/layout/Navigators'
import { setCustomText } from 'react-native-global-props';
import { Font } from 'expo'

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    deviceSize: {
      deviceHeight: Dimensions.get('window').height,
      deviceWidth: Dimensions.get('window').width
    },
    userLogOn: {
      name: '',
      photoUrl: '',
      professorKey: '',
      professorID: ''
    },
    focus: {
      id: '',
      code: '',
      name: '',
      section: '',
      photoUrl: ''
    },
    byPass: false,
    descriptionForSelector: {
      namePage: '',
      iconPage: '',
      screenNavigate: ''
    },
    status: [true, false, false, false, false]
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'LayijiMahaniyomV105': require('./src/font/LayijiMahaniyomV105.ttf')
    });
    const customTextProps = {
      style: {
        fontFamily: 'LayijiMahaniyomV105'
        // backgroundColor:'green'
      }
    }
    setCustomText(customTextProps);
    this.setState({ fontLoaded: true })
  }
  setUserLogOn = (value) => {
    this.setState({ userLogOn: value })
  }
  selectFocus = (focus) => {
    this.setState({ focus })
  }
  switchByPass = () => {
    // this.setState({ byPass: !this.props.byPass })
    this.setState((prevState) => ({
      byPass: !prevState.byPass
    }));
  }
  setDescriptionForSelector = (namePage, iconPage, screenNavigate) => {
    this.setState({ descriptionForSelector: { namePage, iconPage, screenNavigate } })
  }
  changeActivateStatus = (index) => {
    this.setState((prevState, props) => ({
      status: prevState.status.map((s, sIndex) => index === sIndex)
    }));
  }
  render() {
    const { deviceSize, userLogOn, focus, descriptionForSelector, status } = this.state
    return (
      <Navigators
        screenProps={{
          deviceSize, userLogOn, focus, descriptionForSelector, status,
          setUserLogOn: this.setUserLogOn, selectFocus: this.selectFocus, switchByPass: this.switchByPass, setDescriptionForSelector: this.setDescriptionForSelector,
          changeActivateStatus: this.changeActivateStatus
        }} />
    );
  }
}


