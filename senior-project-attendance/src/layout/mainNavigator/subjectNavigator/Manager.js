import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
// import AppVarible from '../../../Model/AppVarible'
import firebase from '../../../config/firebase'
import DrawerHeader from '../Drawer/DrawerHeader'
import ButtonSet from './ButtonSet'

export default class Manager extends React.Component {
  state = {
    professors: []
  }
  componentWillMount = () => {
    this.getProfessorsFormFirebase()
  }
  getProfessorsFormFirebase = () => {
    const { id } = this.props.navigation.state.params.focus
    firebase.database().ref('/Subject').child(id).child('professors').once('value', snapshot => {
      const objProfessor = snapshot.val()
      const professors = Object.keys(objProfessor).map(key => ({
        key: key,
        name: objProfessor[key].name,
        professorID: objProfessor[key].professorID,
        photoUrl: objProfessor[key].photoUrl
      }))
      this.setState({ professors })
      this.updateProfessorsName(professors)
    })
  }
  updateProfessorsName = (professors) => {
    const { id } = this.props.navigation.state.params.focus
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
          name: professorUp ? professorUp.name : professor.name
        }
      })
      console.log('professorUpdate', professorUpdate)
      this.setState({ professors: professorUpdate })
      firebase.database().ref('/Subject').child(id).child('professors').set(professorUpdate)
    })
  }
  render() {
    const { focus } = this.props.navigation.state.params
    const { deviceSize, deviceSize: { deviceHeight, deviceWidth }, professorID, openDrawer } = this.props.screenProps
    const { professors } = this.state
    return (
      <View style={styles.container} >
        <DrawerHeader openDrawer={openDrawer} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={require('../../../pics/logo.png')} style={{ position: 'absolute', width: 320 / 367 * 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > อาจารย์ </Text>
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
                      fontSize: 1 / 30 * deviceHeight
                    }]}>
                      {professor.name}
                    </Text>

                  </View>
                </View>

              </View>

            )}
            keyExtractor={professor => professor.key}
          //numColumns={numColumns} 
          />
        </View>
        <View style={styles.bot} >
          <ButtonSet deviceSize={deviceSize} text={'เข้าเรียน'} />
          <ButtonSet deviceSize={deviceSize} text={'เข้าสาย'} />
          <ButtonSet deviceSize={deviceSize} text={'ขาดเรียน'} />
        </View>
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


