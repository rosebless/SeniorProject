import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
// import AppVarible from '../../../Model/AppVarible'
import firebase from '../../config/firebase'
import DrawerHeader from '../DrawerGroup/DrawerHeader'
import ButtonSet from './ButtonSet'

export default class Manager extends React.Component {
  state = {
    professors: [],
    timeIn: '',
    timeLate: '',
    timeOut: '',
    currentProfessorKey: '',
    uploading: false
  }
  componentWillMount = () => {
    this.setState({ uploading: true }, () => {
      this.getProfessorsFormFirebase()
    })
  }
  componentWillUnmount = () => [
    firebase.database().ref('/Subject').child(this.props.screenProps.focus.id).child('professors').off()
  ]
  getProfessorsFormFirebase = () => {
    const { focus: { id }, userLogOn: { professorID } } = this.props.screenProps
    firebase.database().ref('/Subject').child(id).child('professors').on('value', snapshot => {
      const objProfessor = snapshot.val()
      // get user list
      const professors = Object.keys(objProfessor).map(key => ({
        name: objProfessor[key].name,
        professorID: objProfessor[key].professorID,
        photoUrl: objProfessor[key].photoUrl,
        timeIn: objProfessor[key].timeIn || 'เลือกเวลา',
        timeLate: objProfessor[key].timeLate || 'เลือกเวลา',
        timeOut: objProfessor[key].timeOut || 'เลือกเวลา'
      }))

      // get time  
      console.log(objProfessor)
      console.log(professorID)
      const currentProfessorKey = Object.keys(objProfessor).find(key => objProfessor[key].professorID == professorID)
      const timeIn = objProfessor[currentProfessorKey].timeIn || 'เลือกเวลา'
      const timeLate = objProfessor[currentProfessorKey].timeLate || 'เลือกเวลา'
      const timeOut = objProfessor[currentProfessorKey].timeOut || 'เลือกเวลา'

      // set state 
      this.setState({ professors, currentProfessorKey, timeIn, timeLate, timeOut, uploading: false })

      // update
      this.updateProfessorsName(professors)
    })
  }
  updateProfessorsName = (professors) => {
    const { id } = this.props.screenProps.focus
    console.log('professors', professors)
    firebase.database().ref('/Professor').once('value', snapshot => {
      const objProfessor = snapshot.val()
      const currentProfessor = Object.keys(objProfessor).map(key => ({
        name: objProfessor[key].name,
        professorID: objProfessor[key].professorID
      }))
      console.log('currentProfessor', currentProfessor)
      const professorMustUpdate = currentProfessor.filter(professor => professors.some(professorHere =>
        professor.professorID == professorHere.professorID && professor.name !== professorHere.name))
      console.log('professorMustUpdate', professorMustUpdate)
      const professorUpdate = professors.map(professor => {
        const professorUp = professorMustUpdate.find(p => p.professorID == professor.professorID)
        return {
          ...professor,
          name: professorUp ? professorUp.name : professor.name,
          // timeIn,
          // timeLate,
          // timeOut
        }
      })
      console.log('professorUpdate', professorUpdate)
      this.setState({ professors: professorUpdate })
      firebase.database().ref('/Subject').child(id).child('professors').set(professorUpdate)
    })
  }
  updateTimeOnFirebase = (timeType, timeSet) => { // timeType = 'timeIn', 'timeLate', 'timeOut'
    const { id } = this.props.screenProps.focus
    const { currentProfessorKey } = this.state
    console.log('currentProfessorKey', currentProfessorKey)
    firebase.database().ref(`/Subject/${id}/professors/${currentProfessorKey}/${timeType}`).set(timeSet)
  }
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };
  render() {
    const { openDrawer, navigate } = this.props.navigation
    const { deviceSize, deviceSize: { deviceHeight, deviceWidth }, userLogOn: { professorID }, focus } = this.props.screenProps
    const { professors, timeIn, timeLate, timeOut } = this.state
    return (
      <View style={styles.container} >
        <DrawerHeader openDrawer={openDrawer} goBack={() => navigate('Selector')} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={require('../../pics/scanningPage.png')}
            style={{
              height: 3 / 20 * deviceHeight,
              width: 3 / 20 * deviceHeight,
              marginLeft: 0.05 * deviceWidth
            }} />
          {/* <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > อาจารย์ </Text>  */}
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 0.5 / 10 * deviceWidth,
            width: (1 - 4 / 10 / 3 - 0.5 / 10) * deviceWidth,
            flexWrap: "wrap"
          }}>
            <Text style={[styles.itemName, {
              fontSize: 1 / 25 * deviceHeight
            }]}>
              {focus.code}
            </Text>
            <Text style={[styles.itemDetail, {
              fontSize: 1 / 25 * deviceHeight
            }]}>
              {focus.name}
            </Text>
            { // condition && expression => if(conditon) expression it is short if without else 
              focus.section
              && (
                <Text style={[styles.itemCode, {
                  fontSize: 1 / 25 * deviceHeight
                }]}>
                  ( Sec {focus.section} )
                             </Text>
              )
            }
          </View>
        </View>
        <View style={styles.list} >
          <FlatList
            style={{ width: 0.9 * deviceWidth }}
            data={professors}
            renderItem={({ item: professor }) => (
              <View style={{
                margin: 1 / 10 * 0.1 * deviceHeight,
              }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  height: 1 / 10 * deviceHeight,
                  backgroundColor: '#FFFF99',
                  borderRadius: 1 / 10 * 0.1 * deviceHeight
                }}>
                  <Image
                    source={{ uri: professor.photoUrl }}
                    style={{
                      width: 1 / 10 * 0.8 * deviceHeight, height: 1 / 10 * 0.8 * deviceHeight, margin: 1 / 10 * 0.1 * deviceHeight,
                      borderRadius: 1 / 10 * 0.4 * deviceHeight
                    }} />
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 1 / 10 * 0.1 * deviceHeight,
                    flexWrap: "wrap"
                  }}>
                    <Text style={[styles.itemName, {
                      fontSize: 1 / 20 * deviceHeight,
                      paddingVertical: 1 / 60 * deviceHeight
                    }]}>
                      {professor.name}
                    </Text>

                  </View>
                </View>

              </View>

            )}
            keyExtractor={professor => professor.professorID}
          //numColumns={numColumns} 
          />
        </View>
        <View style={styles.bot} >
          <ButtonSet deviceSize={deviceSize} btext={timeIn} text={'เข้าเรียน'} navigate={this.props.navigation.navigate} updateTimeOnFirebase={(timeSet) => this.updateTimeOnFirebase('timeIn', timeSet)} />
          <ButtonSet deviceSize={deviceSize} btext={timeLate} text={'เข้าสาย'} navigate={this.props.navigation.navigate} updateTimeOnFirebase={(timeSet) => this.updateTimeOnFirebase('timeLate', timeSet)} />
          <ButtonSet deviceSize={deviceSize} btext={timeOut} text={'ขาดเรียน'} navigate={this.props.navigation.navigate} updateTimeOnFirebase={(timeSet) => this.updateTimeOnFirebase('timeOut', timeSet)} />
        </View>
        {this._maybeRenderUploadingOverlay()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 25
  },
  top: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bot: {
    flex: 7,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonAndText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0070C0'
  },
  buttonText: {
    //flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
  },
});


