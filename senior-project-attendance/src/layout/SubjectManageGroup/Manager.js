import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    currentWeekDay: '',
    uploading: false
  }
  componentWillMount = () => {
    this.setState({ uploading: true }, () => {
      this.getProfessorsFormFirebase()
    })
  }
  componentWillUnmount = () => {
    firebase.database().ref('/Subject').child(this.props.screenProps.focus.id).child('professors').off()
  }
  getProfessorsFormFirebase = () => {
    const { focus: { id }, userLogOn: { professorID } } = this.props.screenProps
    firebase.database().ref('/Subject').child(id).child('professors').on('value', snapshot => {
      const objProfessor = snapshot.val()
      // get user list
      const professors = Object.keys(objProfessor).map(key => ({
        name: objProfessor[key].name,
        professorID: objProfessor[key].professorID,
        photoUrl: objProfessor[key].photoUrl,
        key
        // timeIn: objProfessor[key].timeIn || 'เลือกเวลา',
        // timeLate: objProfessor[key].timeLate || 'เลือกเวลา',
        // timeOut: objProfessor[key].timeOut || 'เลือกเวลา',
        // weekDay: objProfessor[key].weekDay || 'เลือกวัน'
      }))
      // get time  
      const currentProfessorKey = Object.keys(objProfessor).find(key => objProfessor[key].professorID === professorID)
      const timeIn = objProfessor[currentProfessorKey].timeIn || 'เลือกเวลา'
      const timeLate = objProfessor[currentProfessorKey].timeLate || 'เลือกเวลา'
      const timeOut = objProfessor[currentProfessorKey].timeOut || 'เลือกเวลา'
      const weekDay = objProfessor[currentProfessorKey].weekDay ? this.weekDays.findIndex(obj => obj.value === objProfessor[currentProfessorKey].weekDay) : 'เลือกวัน'
      // set state  
      this.setState({ professors, currentProfessorKey, timeIn, timeLate, timeOut, currentWeekDay: weekDay, uploading: false })
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
      let professorUpdate = {}
      professorMustUpdate.forEach(professor => {
        const id = [professor.key, 'name'].join('/')
        professorUpdate[id] = professor.name
      })
      firebase.database().ref('/Subject').child(id).child('professors').update(professorUpdate)
    })
  }
  updateTimeOnFirebase = (timeType, timeSet, finalMethod) => { // timeType = 'timeIn', 'timeLate', 'timeOut' 
    const { id } = this.props.screenProps.focus
    const { currentProfessorKey, timeIn, timeLate, timeOut } = this.state
    const [hour, minute] = timeSet.split(':')
    const [hourIn, minuteIn] = timeIn.split(':')
    const [hourLate, minuteLate] = timeLate.split(':')
    const [hourOut, minuteOut] = timeOut.split(':')
    if (
      (timeType === 'timeLate' && (parseInt(hour, 10) < parseInt(hourIn, 10) || (hour === hourIn && parseInt(minute, 10) <= parseInt(minuteIn, 10)))) ||
      (timeType === 'timeOut' && (parseInt(hour, 10) < parseInt(hourLate, 10) || (hour === hourLate && parseInt(minute, 10) <= parseInt(minuteLate, 10))))
    ) {
      Alert.alert(
        'เวลาไม่ถูกต้อง',
        timeType === 'timeLate'
          ? 'เวลาเข้าสายต้องมากกว่าเวลาเข้าเรียน'
          : 'เวลาขาดเรียนต้องมากกว่าเวลาเข้าสาย',
        [
          {
            text: 'ตกลง', onPress: () => { }
          },
        ],
        { cancellable: false }
      )
    } else if (
      (timeType === 'timeIn' && (parseInt(hour, 10) > parseInt(hourLate, 10) || (hour === hourLate && parseInt(minute, 10) >= parseInt(minuteLate, 10)))) ||
      (timeType === 'timeLate' && (parseInt(hour, 10) > parseInt(hourOut, 10) || (hour === hourOut && parseInt(minute, 10) >= parseInt(minuteOut, 10))))
    ) {
      Alert.alert(
        'เวลาไม่ถูกต้อง',
        timeType === 'timeIn'
          ? 'เวลาเข้าเรียนต้องน้อยกว่าเวลาเข้าสาย \n ต้องการรีเซตเวลาเข้าสายหรือไม่ '
          : 'เวลาเข้าสายต้องน้อยกว่าเวลาขาดเรียน \n ต้องการรีเซตเวลาเข้าสายหรือไม่ ',
        [
          {
            text: 'รีเซต', onPress: () => {
              firebase.database().ref(`/Subject/${id}/professors/${currentProfessorKey}/${timeType}`).set(timeSet)
              firebase.database().ref(`/Subject/${id}/professors/${currentProfessorKey}`).child(
                timeType === 'timeIn'
                  ? 'timeLate'
                  : 'timeOut'
              ).remove()
              finalMethod()
            }
          },
          {
            text: 'ยกเลิก', onPress: () => { }
          }
        ],
        { cancellable: false }
      )
    } else {
      console.log('currentProfessorKey', currentProfessorKey)
      firebase.database().ref(`/Subject/${id}/professors/${currentProfessorKey}/${timeType}`).set(timeSet)
      finalMethod()
    }
  }
  updateWeekDayOnFirebase = (index) => {
    const { id } = this.props.screenProps.focus
    const { currentProfessorKey } = this.state
    const weekday = this.weekDays[index].value
    firebase.database().ref(`/Subject/${id}/professors/${currentProfessorKey}/weekDay`).set(weekday).then(() => {
      this.setState({ currentWeekDay: index })
    })
  }
  weekDays = [
    { id: 'อา.', value: 'วันอาทิตย์' },
    { id: 'จ.', value: 'วันจันทร์' },
    { id: 'อ.', value: 'วันอังคาร' },
    { id: 'พ.', value: 'วันพุธ' },
    { id: 'พฤ.', value: 'วันพฤหัสบดี' },
    { id: 'ศ.', value: 'วันศุกร์' },
    { id: 'ส.', value: 'วันเสาร์' }
  ]
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
    const { professors, timeIn, timeLate, timeOut, currentWeekDay } = this.state
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
                marginHorizontal: 1 / 10 * 0.1 * deviceHeight,
                marginVertical: 1 / 10 * 0.05 * deviceHeight
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
            keyExtractor={professor => professor.key}
          //numColumns={numColumns} 
          />
        </View>
        <View style={styles.bot} >
          <View style={[styles.weekday, { width: 0.9 * deviceWidth }]} >
            {this.weekDays.map((w, index) => (
              <TouchableOpacity key={index} onPress={() => this.updateWeekDayOnFirebase(index)}
                style={[styles.weekdayball, {
                  height: 1 / 15 * 0.8 * deviceHeight,
                  width: 1 / 15 * 0.8 * deviceHeight,
                  borderRadius: 1 / 2 * 1 / 15 * 0.8 * deviceHeight,
                  backgroundColor: currentWeekDay === index ? '#00CED1' : '#EDEDED'
                }]} >
                <Text
                  style={{
                    fontSize: 1 / 30 * deviceHeight,
                    paddingVertical: 1 / 60 * deviceHeight,
                    color: currentWeekDay === index ? '#fff' : '#000'
                  }}
                >
                  {this.weekDays[index].id}
                </Text>
              </TouchableOpacity >
            ))}
          </View>
          <ButtonSet deviceSize={deviceSize} btext={timeIn} text={'เข้าเรียน'} navigate={this.props.navigation.navigate} updateTimeOnFirebase={(timeSet, finalMethod) => this.updateTimeOnFirebase('timeIn', timeSet, finalMethod)} />
          <ButtonSet deviceSize={deviceSize} btext={timeLate} text={'เข้าสาย'} navigate={this.props.navigation.navigate} updateTimeOnFirebase={(timeSet, finalMethod) => this.updateTimeOnFirebase('timeLate', timeSet, finalMethod)} />
          <ButtonSet deviceSize={deviceSize} btext={timeOut} text={'ขาดเรียน'} navigate={this.props.navigation.navigate} updateTimeOnFirebase={(timeSet, finalMethod) => this.updateTimeOnFirebase('timeOut', timeSet, finalMethod)} />
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
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bot: {
    flex: 8,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  weekday: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  weekdayball: {
    justifyContent: 'center',
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
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
