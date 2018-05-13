import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
//port { Icon } from 'native-base'
import DrawerHeader from './Drawer/DrawerHeader';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import AppVarible from '../../Model/AppVarible'
import firebase from '../../config/firebase'

export default class selection extends React.Component {
  /*
static navigationOptions = ({ navigation }) => ({ 
  title: 'เช็คชื่อ',
  //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
  //drawerLabel: 'Notification',
  
  drawerIcon: ({ tintColor }) => ( 
    <Image 
      source={require('../../pics/temp4.png')}
      style={styles.icon}
    />
  ),
})
*/
  constructor(props) {
    super(props)
    this.state = {
      subjects: []
    } 
  }

  componentWillMount = () => {
    // firebase.database().goOffline()
  this.getUserSubjectsFormFirebase()
  }      

  componentWillUnmount = () => {
    // firebase.database(false)
    // firebase.database().ref('/Professor').child(professorKey).child('subjects').off()
  }

  getUserSubjectsFormFirebase = () => { 
    const { professorKey } = this.props
    console.log(professorKey)
    firebase.database().ref('/Professor').child(professorKey).child('subjects').once('value', snapshot => {
      // console.log(snapshot.val())
      // resolve(snapshot.val()); 
      const objSubject = snapshot.val()
      const subjects = this.customQuery(objSubject).map((key, index) => {
        // console.log(index % 4, index)
        let photoUrl
        switch (index % 4) {
          case 1:
            photoUrl = require('../../pics/temp1.png')
            break
          case 2:
            photoUrl = require('../../pics/temp2.png')
            break
          case 3:
            photoUrl = require('../../pics/temp3.png')
            break
          case 4:
            photoUrl = require('../../pics/temp4.png')
            break
        }
        // console.log(ImageProduct)
        return key.split('-')[3]
          ? {
            id: key,
            code: key.split('-')[2],
            name: objSubject[key].name,
            section: key.split('-')[3],
            photoUrl
          }
          : {
            id: key,
            code: key.split('-')[2],
            name: objSubject[key].name,
            photoUrl
          }
      }

      )
      this.setState({ subjects })
    })
  }

  customQuery = (objSubject) => {
    const startTerm1 = { month: 7, day: 1 }
    const startTerm2 = { month: 1, day: 1 }
    let year, term
    const currentDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'numeric', day: 'numeric' })
    const currentYear = parseInt(currentDate.split('/')[2])
    const currentMonth = parseInt(currentDate.split('/')[1])
    const currentDay = parseInt(currentDate.split('/')[0])
    if (startTerm2.month <= currentMonth && currentMonth < startTerm1.month) {
      year = currentYear - 1
      term = 2
    } else {
      year = currentYear
      term = 1
    }
    const currentTerm = [year, term].join('-')
    console.log('currentTerm', currentTerm)
    return Object.keys(objSubject).filter(subject => subject.substr(0, 6) == currentTerm)
  }

  render() { 
    console.log('selection',this.props)
    const {
      deviceSize: { deviceHeight, deviceWidth },
      professorID,
      openDrawer,
      namePage,
      customNavigate,
      screenNavigate,
    } = this.props;
    const { subjects } = this.state
    return (
      <View style={styles.container}>
        <DrawerHeader openDrawer={openDrawer} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={require('../../pics/logo.png')} style={{ position: 'absolute', width: 320 / 367 * 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > {namePage} </Text>
        </View>
        <View style={styles.bot} >
          <FlatList
            style={{ width: 0.9 * deviceWidth }}
            data={subjects}
            renderItem={ ({item:subject}) => (

              <View style={{
                margin: 1 / 10 * 0.1 * deviceHeight,
              }}>
              {/* {console.log('inloop',subject)} */}
                <TouchableOpacity
                  onPress={() => {
                    customNavigate(screenNavigate, { focus: subject })
                  }} >
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 1 / 10 * deviceHeight,

                    backgroundColor: '#FFFF99',

                    borderRadius: 1 / 10 * 0.1 * deviceHeight

                  }}>
                    <Image
                      source={subject.photoUrl}
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
                        {subject.code}
                      </Text>
                      <Text style={[styles.itemDetail, {
                        fontSize: 1 / 10 * 1 / 6 * deviceHeight
                      }]}>
                        {subject.name}
                      </Text>
                      { // condition && expression => if(conditon) expression it is short if without else 
                        subject.section
                        && (
                          <Text style={[styles.itemCode, {
                            fontSize: 1 / 10 * 1 / 6 * deviceHeight
                          }]}>
                            ( Sec {subject.section} )
                             </Text>
                        )
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

            )}
            keyExtractor={subject => subject.id}
          //numColumns={numColumns} 
          />
        </View>
      </View>
    );
  }
}

// const data = [
//   { subjectCode: '05016013', subjectName: 'FUNCTION OF COMPLEX VARIABLES', section: '1', ImageProduct: require('../../pics/temp3.png') },
//   { subjectCode: '05016062', subjectName: 'SPECIAL TOPICS IN APPLIED MATHEMATICS FOR BUSINESS', section: '1', ImageProduct: require('../../pics/temp1.png') },
//   { subjectCode: '05016117', subjectName: 'TIME SERIES AND SURVIVAL MODEL ESTIMATION', section: '1', ImageProduct: require('../../pics/temp2.png') },
//   { subjectCode: '05016146', subjectName: 'SPECIAL TOPICS IN INFORMATIC MATHEMATICS 1', section: '1', ImageProduct: require('../../pics/temp5.png') },
//   { subjectCode: '05016147', subjectName: 'SPECIAL TOPICS IN INFORMATIC MATHEMATICS 2', section: '1', ImageProduct: require('../../pics/temp2.png') },
//   { subjectCode: '05016008', subjectName: 'NUMERICAL ANALYSIS 1', section: '1', ImageProduct: require('../../pics/temp3.png') },
//   { subjectCode: '05016007', subjectName: 'PARTIAL DIFFERENTIAL EQUATION', section: '1', ImageProduct: require('../../pics/temp4.png') },
//   { subjectCode: '05016048', subjectName: 'FINANCIAL MATHEMATICS', section: '1', ImageProduct: require('../../pics/temp3.png') },
//   { subjectCode: '05016114', subjectName: 'MATHEMATICAL MODELLING IN INDUSTRY', section: '1', ImageProduct: require('../../pics/temp2.png') }
// ];
//const numColumns = 2; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 25
  },
  top: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bot: {
    flex: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    //fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemDetail: {
    fontSize: 14,
    color: '#000',
    //fontWeight: '600',
  },
  itemCode: {
    //fontWeight: '600',
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
  },
});
