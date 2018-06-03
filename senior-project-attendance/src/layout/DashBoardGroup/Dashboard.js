import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ScrollView, ActivityIndicator } from 'react-native';
//port { Icon } from 'native-base'
// import AppVarible from '../../../Model/AppVarible' 
import { Table, TableWrapper, Row, Cell, Col } from 'react-native-table-component'
import firebase from '../../config/firebase'
import DrawerHeader from '../DrawerGroup/DrawerHeader'

export default class Dashboard extends React.Component {

  state = {
    header: [],
    widthArr: [],
    attendanceTable: {},
    uploading: false
  }

  componentWillMount = () => {
    this.setState({ uploading: true }, () => {
      this.getStudentsFormFirebase()
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/Subject').child(this.props.screenProps.focus.id).off()
  }

  getStudentsFormFirebase = () => {
    const { id } = this.props.screenProps.focus
    // console.log()
    firebase.database().ref('/Subject').child(id).on('value', snapshot => {
      const objStudents = snapshot.val()
      const students = Object.keys(objStudents.students)
      const attendance = objStudents.attendance
      this.attendanceMapping(students, attendance)
    })
  }

  attendanceMapping = (students = [], attendance = {}) => {
    const { id } = this.props.screenProps.focus
    const { deviceHeight } = this.props.screenProps.deviceSize
    const header = []
    const widthArr = [0.2 * deviceHeight]
    const attendanceLen = Object.keys(attendance).length
    const numOfWeeks = attendanceLen < 4 ? 3 : attendanceLen
    // console.log(numOfWeeks)
    for (let i = 1; i <= numOfWeeks; i++) {
      header.push(`week ${i}`)
      widthArr.push(0.1 * deviceHeight)
    }
    const attendanceTable = {}
    students.forEach(student => {
      const studentAtten = []
      Object.keys(attendance).sort((a, b) => (a.split('-')[1] - b.split('-')[1])).forEach(weekKey => {
        objStudents = attendance[weekKey].students
        studentAtten.push(objStudents ? this.readStatus(objStudents[Object.keys(objStudents).find(key => key == student)]) : '')
      })
      for (let i = attendanceLen + 1; i <= numOfWeeks; i++) studentAtten.push('')
      studentAtten.push(this.EditButton(student, attendance))
      attendanceTable[student] = studentAtten
    })
    header.push('หมายเหตุ')
    widthArr.push(0.2 * deviceHeight)
    this.setState({ uploading: false, header, widthArr, attendanceTable })

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

  EditButton = (student, attendance) => (
    <Button title='หมายเหตุ' onPress={() => {
      attendance['week-1'].students
        ? this.props.navigation.navigate('EditPage', { student, attendance })
        : Alert.alert('ไม่มีข้อมูล', '', [{ text: 'ตกลง' }])
    }} />
  )

  readStatus = (studentAtten) => (
    studentAtten
      ? studentAtten.status == 'atten'
        ? this.greenBall()
        : studentAtten.status == 'late'
          ? this.yellowBall()
          : this.redBall()
      : undefined
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
    const { header, widthArr, attendanceTable } = this.state
    const widthHeader = widthArr[0]
    const widthArrBody = widthArr.filter((a, index) => index != 0)
    // console.log(header, attendanceTable)
    return (
      <View style={styles.container} >
        <DrawerHeader openDrawer={openDrawer} goBack={() => navigate('Dashboard_Selection')} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={require('../../pics/dashboardPage.png')} style={{ position: 'absolute', width: 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1 / 15 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} > สรุปผล </Text>
        </View>
        <View style={styles.center}>
          <Text style={{ fontSize: 1 / 25 * deviceHeight }} > {focus.name} </Text>
          <Text style={{ fontSize: 1 / 25 * deviceHeight }} > {focus.code} </Text>
        </View>
        <View style={styles.bot}>
          <Table borderStyle={{ borderColor: '#0070C0' }} >
            <TableWrapper style={{ borderColor: '#0070C0', flexDirection: 'row' }} >
              <Cell data={'รหัสนักศึกษา'} style={[styles.headerTable, { left: 0, height: 50, width: widthHeader }]} textStyle={styles.text} />
              <ScrollView horizontal={true} ref={scrollView => { this.headerScrollView = scrollView }} style={{ left: 0, width: deviceWidth - widthHeader }} >
                <Row data={header} widthArr={widthArrBody} style={[styles.headerTable, { height: 50, backgroundColor: '#ffb191' }]} textStyle={styles.text} borderStyle={{ borderColor: '#0070C0' }} />
              </ScrollView>
            </TableWrapper >
            <ScrollView  >
              <TableWrapper style={{ borderColor: '#0070C0', flexDirection: 'row' }} >
                <TableWrapper style={{ left: 0, borderColor: '#0070C0', width: widthHeader }} >
                  {
                    attendanceTable &&
                    Object.keys(attendanceTable).map((key, index) => (
                      <Cell data={[key]} key={key} style={[styles.bodyTable, { height: 40, backgroundColor: index % 2 ? '#fffacd' : '#FFFBDD' }]} textStyle={styles.text} />
                    ))
                  }
                </TableWrapper >
                <ScrollView
                  horizontal={true} scrollEventThrottle={16}
                  onScroll={e => {
                    this.headerScrollView.scrollTo({ x: e.nativeEvent.contentOffset.x, animated: false });
                  }}
                  style={{ left: 0, width: deviceWidth - widthHeader }}
                >
                  <TableWrapper style={{ borderColor: '#0070C0', flexDirection: 'column' }} >
                    {
                      attendanceTable &&
                      Object.keys(attendanceTable).map((key, index) => {
                        // console.log(attendanceTable[key])
                        return <Row data={attendanceTable[key]} key={key} widthArr={widthArrBody} style={[styles.bodyTable, { height: 40, backgroundColor: index % 2 ? '#fffacd' : '#FFFBDD' }]} textStyle={styles.text} borderStyle={{ borderColor: '#0070C0' }} />
                      })
                    }
                  </TableWrapper>
                </ScrollView>
              </TableWrapper >
            </ScrollView>

            {/*       <ScrollView horizontal={true}>
              <View>

                <Row data={header}
                  widthArr={widthArr}
                  style={styles.header} textStyle={styles.text}
                />

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
            </ScrollView> */}
          </Table>
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
  checkedBall: {

  },
  top: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bot: {
    flex: 12,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerTable: {
    backgroundColor: '#ffb191',
    borderColor: '#0070C0',
    // textAlign: 'center'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  bodyTable: {
    borderColor: '#0070C0',
    // textAlign: 'center'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
