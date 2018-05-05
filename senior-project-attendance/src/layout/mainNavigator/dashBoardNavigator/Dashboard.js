import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import AppVarible from '../../../Model/AppVarible' 
import { Table, TableWrapper, Row } from 'react-native-table-component'

export default class Dashboard extends React.Component {   
  
  state = {
    students: []
  }

  componentWillMount = () => {
    this.getStudentsFormFirebase() 
    this.getAttendanceFormFirebase()
  }

  getStudentsFormFirebase = () => {
    const { id } = this.props.navigation.state.params.focus
    firebase.database().ref('/Subject').child(id).child('students').on('value', snapshot => {
      const objStudents = snapshot.val()
      const student = Object.keys(objStudents).map(key => ({
        code: key
      }))
      this.setState({ students })
    })
  } 

  getAttendanceFormFirebase = () => {
    const { id } = this.props.navigation.state.params.focus 
    const { students } = this.state
    firebase.database().ref('/Attendance').on('value', snapshot => {
      const objAttendance = snapshot.val()
      const attendance = Object.keys(objAttendance).filter( key => objAttendance[key].subject == id ).map(key => ({
        date: objAttendance[key].date , 
        students: objAttendance[key].students , 
      }))
      const header = [] 
      const dataTable = []
      attendance.forEach( one => {
        header.push(one.date)
        const dataCol = [] 
        students.forEach( (student,index) => { 
          const s = Object.keys(one.students).filter( s => student==s )[0]
          if( s ) dataCol.push(renderCell(s)) 
          else dataCol.push(renderCell('absent')) 
        } )
        dataTable.push(dataCol)
      })
    })
  }

  render() {  

    return (
      
      <View style={styles.container} >
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
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
  temp: {
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});


