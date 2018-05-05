import React, { Component } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import AppVarible from '../../../Model/AppVarible'
import firebase from '../../../config/firebase' 

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
    firebase.database().ref('/Subject').child(id).child('professor').on('value', snapshot => {
      const objProfessor = snapshot.val()
      const professors = Object.keys(objProfessor).map(key => ({
        key: key,
        name: objProfessor[key].name,
        professorID: objProfessor[key].professorID,
        photoUrl: objProfessor[key].photoUrl
      }))
      this.setState({ professors })
    })
  }

  render() {
    const { subjects, focus } = this.props.navigation.state.params
    const { deviceSize: { deviceHeight, deviceWidth }, professorID, drawerNavigate } = this.props.screenProps
    const { professors } = this.state
    return (
      <View style={styles.container} >
        <DrawerHeader drawerNavigate={drawerNavigate} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={require('../../../pics/logo.png')} style={{ position: 'absolute', width: 320 / 367 * 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > {namePage} </Text>
        </View>
        <View style={styles.list} >
          <FlatList
            style={{ width: 0.9 * deviceWidth }}
            data={professors}
            renderItem={({ professor }) => (

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
                      width: 1 / 10 * 0.8 * deviceHeight, height: 1 / 10 * 0.8 * deviceHeight, margin: 1 / 10 * 0.1 * deviceHeight
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
                      fontSize: 1 / 10 * 1 / 6 * deviceHeight
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
          <ButtonSet text={'เข้าเรียน'} />
          <ButtonSet text={'เข้าสาย'} />
          <ButtonSet text={'ขาดเรียน'} />
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
    alignItems: 'center'
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
    justifyContent: 'center',
    alignItems: 'center',
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


