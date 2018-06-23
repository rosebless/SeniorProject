import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import DrawerHeader from './DrawerGroup/DrawerHeader';
import firebase from '../config/firebase'

export default class selection extends React.Component {
  state = {
    subjects: [],
    uploading: false,
    now: {}
  }
  componentWillMount = () => {
    // firebase.database().goOffline()
    this.setState({ uploading: true }, () => {
      this.getUserSubjectsFormFirebase()
    })
  }

  componentWillUnmount = () => {
    // firebase.database(false)
    firebase.database().ref('/Professor').child(this.props.screenProps.userLogOn.professorKey).child('subjects').off()
  }

  getCurrentTerm = () => new Promise((resolve) => {
    firebase.database().ref('/Config/start-term').on('value', snapshot => {
      let startTerm = {}
      Object.keys(snapshot.val()).forEach(key => {    // key = term-1 , term-2 , term-3 
        const date = snapshot.val()[key].date.split('-')
        startTerm[key.split('-').join('')] = {
          day: date[0],
          month: date[1],
          year: date[2]
        }
      })
      const dateAll = new Date()
      const now = {
        day: dateAll.getDate(),
        month: dateAll.getMonth() + 1,
        year: dateAll.getFullYear()
      }
      this.setState({ now }, () => {
        let currentTerm = ''
        if (this.isAfterNow(startTerm['term1']) && this.isBeforeNow(startTerm['term2'])) {
          currentTerm = [startTerm['term1'].year, 1].join('-')
        } else if (this.isAfterNow(startTerm['term2']) && this.isBeforeNow(startTerm['term3'])) {
          currentTerm = [startTerm['term1'].year, 2].join('-')
        } else {
          currentTerm = [startTerm['term1'].year, 3].join('-')
        }
        resolve(currentTerm)
      })
    })
  })

  isBeforeNow = (time) => {
    const { now } = this.state
    return time.year < now.year ||
      (time.year === now.year && time.month < now.month) ||
      (time.year === now.year && time.month === now.month && time.day < now.day)
  }

  isAfterNow = (time) => !this.isBeforeNow(time)

  getUserSubjectsFormFirebase = async () => {
    const { professorKey } = this.props.screenProps.userLogOn
    // const startTerm1 = { month: 7, day: 1 }
    // const startTerm2 = { month: 1, day: 1 }
    // let year, term
    // const currentDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'numeric', day: 'numeric' })
    // const currentYear = parseInt(currentDate.split('/')[2])
    // const currentMonth = parseInt(currentDate.split('/')[1])
    // const currentDay = parseInt(currentDate.split('/')[0])
    // if (startTerm2.month <= currentMonth && currentMonth < startTerm1.month) {
    //   year = currentYear - 1
    //   term = 2
    // } else {
    //   year = currentYear
    //   term = 1
    // }
    // const currentTerm = [year, term].join('-') 
    const currentTerm = await this.getCurrentTerm() 
    console.log(' Selector Search term : ',currentTerm)
    firebase.database().ref('/Professor').child(professorKey).child('subjects').orderByKey().startAt([currentTerm, '-'].join('')).endAt([currentTerm, '~'].join('')).on('value', snapshot => {
      const objSubject = snapshot.val() || {}
      const subjects = Object.keys(objSubject).map((key, index) => {
        let photoUrl
        switch (index % 3) {
          case 0:
            photoUrl = require('../pics/selection1.png')
            break
          case 1:
            photoUrl = require('../pics/selection2.png')
            break
          case 2:
            photoUrl = require('../pics/selection3.png')
            break
        }
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
      this.setState({ subjects, uploading: false })
    })
  }
  // customQuery = (objSubject) => {
  //   const startTerm1 = { month: 7, day: 1 }
  //   const startTerm2 = { month: 1, day: 1 }
  //   let year, term
  //   const currentDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'numeric', day: 'numeric' })
  //   const currentYear = parseInt(currentDate.split('/')[2])
  //   const currentMonth = parseInt(currentDate.split('/')[1])
  //   const currentDay = parseInt(currentDate.split('/')[0])
  //   if (startTerm2.month <= currentMonth && currentMonth < startTerm1.month) {
  //     year = currentYear - 1
  //     term = 2
  //   } else {
  //     year = currentYear
  //     term = 1
  //   }
  //   const currentTerm = [year, term].join('-')
  //   console.log('currentTerm', currentTerm)
  //   return Object.keys(objSubject).filter(subject => subject.substr(0, 6) == currentTerm)
  // }
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
    // console.log('selection', this.props)
    const { deviceSize: { deviceHeight, deviceWidth }, descriptionForSelector: { namePage, iconPage, screenNavigate }, selectFocus } = this.props.screenProps
    const { subjects } = this.state
    const { navigate, openDrawer } = this.props.navigation
    return (
      <View style={styles.container}>
        <DrawerHeader openDrawer={openDrawer} deviceHeight={deviceHeight} />
        <View style={styles.top}>
          <Image source={iconPage} style={{ position: 'absolute', width: 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1 / 15 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} > {namePage} </Text>
        </View>
        <View style={styles.bot} >
          <FlatList
            style={{ width: 0.9 * deviceWidth }}
            data={subjects}
            renderItem={({ item: subject }) => (
              <View style={{
                margin: 1 / 10 * 0.1 * deviceHeight,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    selectFocus(subject)
                    navigate(screenNavigate)
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
                        fontSize: 1 / 10 * 1 / 3 * deviceHeight
                      }]}>
                        {subject.code}
                      </Text>
                      <Text style={[styles.itemDetail, {
                        fontSize: 1 / 10 * 1 / 3 * deviceHeight
                      }]}>
                        {subject.name}
                      </Text>
                      { // condition && expression => if(conditon) expression it is short if without else 
                        subject.section
                        && (
                          <Text style={[styles.itemCode, {
                            fontSize: 1 / 10 * 1 / 3 * deviceHeight
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
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemDetail: {
    fontSize: 14,
    color: '#000',
  },
  itemCode: {
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
  },
});
