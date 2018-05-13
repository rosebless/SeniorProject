import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
//port { Icon } from 'native-base'
// import AppVarible from '../../../Model/AppVarible' 
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component'
import firebase from '../../../config/firebase'
import DrawerHeader from '../Drawer/DrawerHeader'

export default class Dashboard extends React.Component {

  state = {
    header: [],
    attendance: [],
    widthArr: []
  }

  componentWillMount = () => {
    this.getStudentsFormFirebase()
  }

  getStudentsFormFirebase = () => {
    const { id } = this.props.navigation.state.params.focus
    console.log()
    firebase.database().ref('/Subject').child(id).on('value', snapshot => {
      const objStudents = snapshot.val()
      const students = Object.keys(objStudents.students)
      const attendance = objStudents.attendance
      this.attendanceMapping(students, attendance)
    })
  }

  attendanceMapping = (students = [], attendance = {}) => {
    const { id } = this.props.navigation.state.params.focus
    const { deviceHeight } = this.props.screenProps.deviceSize
    const header = ['รหัสนักศึกษา']
    const widthArr = [0.2 * deviceHeight]
    Object.keys(attendance).forEach(weekName => {
      header.push(weekName.split('-').join(' '))
      widthArr.push(0.1 * deviceHeight)
    })
    const attendanceTable = []
    students.forEach(student => {
      const studentsAtten = [student]
      Object.keys(attendance).forEach(weekKey => {
        objStudents = attendance[weekKey].students
        attendance[weekKey].students && studentsAtten.push(this.readStatus(objStudents[Object.keys(objStudents).find(key => key == student)]))
      })
      attendanceTable.push(studentsAtten)
    })

    this.setState({ header, widthArr, attendanceTable })

    // firebase.database().ref('/Attendance').on('value', snapshot => {
    //   const objAttendance = snapshot.val()
    //   const attendance = Object.keys(objAttendance).filter(key => objAttendance[key].subject == id).map(key => ({
    //     date: objAttendance[key].date,
    //     students: objAttendance[key].students,
    //   }))
    //   const header = []
    //   const dataTable = []
    //   attendance.forEach(one => {
    //     header.push(one.date)
    //     const dataCol = []
    //     students.forEach((student, index) => {
    //       const s = Object.keys(one.students).filter(s => student == s)[0]
    //       if (s) dataCol.push(renderCell(s))
    //       else dataCol.push(renderCell('absent'))
    //     })
    //     dataTable.push(dataCol)
    //   })
    // })
  }

  readStatus = (studentAtten) => (
    studentAtten
      ? studentAtten.status == 'atten'
        ? this.greenBall()
        : this.yellowBall()
      : this.redBall()
  )

  greenBall = () => {
    const { deviceHeight } = this.props.screenProps.deviceSize
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.1 * deviceHeight,
      }}>
        <View style={[styles.checkedBall, {
          height: 0.05 * deviceHeight,
          width: 0.05 * deviceHeight,
          borderRadius: 1 / 2 * deviceHeight,
          backgroundColor: '#3eee26'
        }]} />
      </View>
    )
  }

  yellowBall = () => {
    const { deviceHeight } = this.props.screenProps.deviceSize
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.1 * deviceHeight,
      }}>
        <View style={[styles.checkedBall, {
          height: 0.05 * deviceHeight,
          width: 0.05 * deviceHeight,
          borderRadius: 1 / 2 * deviceHeight,
          backgroundColor: '#ffc000'
        }]} />
      </View>
    )
  }

  redBall = () => {
    const { deviceHeight } = this.props.screenProps.deviceSize
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.1 * deviceHeight,
      }}>
        <View style={[styles.checkedBall, {
          height: 0.05 * deviceHeight,
          width: 0.05 * deviceHeight,
          borderRadius: 1 / 2 * deviceHeight,
          backgroundColor: '#ff0000'
        }]} />
      </View>
    )
  }

  render() {
    const { focus } = this.props.navigation.state.params
    const { deviceSize, deviceSize: { deviceHeight, deviceWidth }, professorID, openDrawer } = this.props.screenProps
    const { header, widthArr, attendanceTable } = this.state
    console.log(header, attendanceTable)
    return (
      <View style={styles.container} >
        <DrawerHeader openDrawer={openDrawer} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={require('../../../pics/logo.png')} style={{ position: 'absolute', width: 320 / 367 * 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > สรุปผล </Text>
        </View>
        <View style={styles.center}>
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > {focus.name} </Text>
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > {focus.code} </Text>
        </View>
        <View style={styles.bot}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#0070C0' }}>
                <Row data={header}
                  widthArr={widthArr}
                  style={styles.header} textStyle={styles.text}
                />
              </Table>
              <ScrollView overScrollMode={'never'} style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#0070C0' }}>
                  {
                    attendanceTable &&
                    attendanceTable.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
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
  checkedBall: {

  },
  top: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bot: {
    flex: 11,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});


