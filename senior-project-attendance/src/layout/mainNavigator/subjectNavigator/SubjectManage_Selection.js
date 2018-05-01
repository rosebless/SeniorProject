/*
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import DrawerHeader from '../Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base'; 
import AppVarible from '../../../Model/AppVarible'

export default class ScanningPage_Selection extends React.Component { 
  static navigationOptions = ({ navigation }) => ({ 
    title: 'เช็คชื่อ',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../pics/temp4.png')}
        style={styles.icon}
      />
    ),
  })
  render() {
    // @FIX step 2
    // add pass rootNavigation in screenProps to DrawerHeader Component

    const { navigate } = this.props.navigation;
    /*
    const {
      screenProps: { rootNavigation },
      ...props
    } = this.props;
    *//*
   if (!AppVarible.navigationSaved.subject.status) {
    AppVarible.navigationSaved.subject.status = true ;
    AppVarible.navigationSaved.subject.navigate = navigate ;
  }

    return (
      <View style={styles.container}>
        <DrawerHeader {...this.props} /*rootNavigation={rootNavigation}*//* />
        <View style={styles.top}>
          <Image source={require('../../../pics/logo.png')} style={{ width: 320/367*150, height: 150 }} />
          <Text> รายวิชา </Text>
        </View>
        <View style={styles.bot} >
          <FlatList
            style={{width: deviceWidth}}
            data={data}
            renderItem={({ item }) => (
              <View style={{
                margin: 5
              }}>
              <TouchableOpacity onPress={() => {navigate('Scanner')}} >
                <View style={{
                flex: 1,
                flexDirection: 'row',
                //backgroundColor:'#ABCEEF'
              }}>
                <Image
                  source={item.ImageProduct}
                  style={{
                    width: 100, height: 100, margin: 5, marginLeft: 10,
                  }} />
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                  flexWrap: "wrap"
                }}>
                  <Text style={styles.itemName}> {item.subjectCode} </Text>
                  <Text style={styles.itemDetail}> {item.subjectName} </Text>
                  <Text style={styles.itemCode}> ( Sec {item.section} ) </Text>
                </View>
                </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          //numColumns={numColumns} 
          />
        </View>
      </View>
    );
  }
}
const data = [
  { subjectCode: '05016013', subjectName: 'FUNCTION OF COMPLEX VARIABLES', section: '1', ImageProduct: require('../../../pics/temp3.png') },
  { subjectCode: '05016062', subjectName: 'SPECIAL TOPICS IN APPLIED MATHEMATICS FOR BUSINESS', section: '1', ImageProduct: require('../../../pics/temp1.png') },
  { subjectCode: '05016117', subjectName: 'TIME SERIES AND SURVIVAL MODEL ESTIMATION', section: '1', ImageProduct: require('../../../pics/temp2.png') },
  { subjectCode: '05016146', subjectName: 'SPECIAL TOPICS IN INFORMATIC MATHEMATICS 1', section: '1', ImageProduct: require('../../../pics/temp5.png') },
  { subjectCode: '05016147', subjectName: 'SPECIAL TOPICS IN INFORMATIC MATHEMATICS 2', section: '1', ImageProduct: require('../../../pics/temp2.png') },
  { subjectCode: '05016008', subjectName: 'NUMERICAL ANALYSIS 1', section: '1', ImageProduct: require('../../../pics/temp3.png') },
  { subjectCode: '05016007', subjectName: 'PARTIAL DIFFERENTIAL EQUATION', section: '1', ImageProduct: require('../../../pics/temp4.png') },
  { subjectCode: '05016048', subjectName: 'FINANCIAL MATHEMATICS', section: '1', ImageProduct: require('../../../pics/temp3.png') },
  { subjectCode: '05016114', subjectName: 'MATHEMATICAL MODELLING IN INDUSTRY', section: '1', ImageProduct: require('../../../pics/temp2.png') }
];
//const numColumns = 2; 

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 25
  },
  top: {
    flex: 1,
    flexDirection: 'row' ,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bot: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingTop: 5,
    padding: 10,
    marginLeft: 2.5,
    marginRight: 2.5,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap' 
  },
  itemDetail: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
  },
});
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
import DrawerHeader from '../Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base'; 
import AppVarible from '../../../Model/AppVarible'
import SelectionPage from '../Selection'

export default class ScanningPage extends React.Component { 
  
  render() {
    
   const { navigate } = this.props.navigation;

    return (
      <SelectionPage 
      screenProps={{ 
        ...this.props.screenProps, // deviceSize , userID, drawerNavigate
          namePage: 'รายวิชา' , 
          customNavigate: navigate , 
          screenNavigate: 'Manager' 
        }} />
    );
  }
}
