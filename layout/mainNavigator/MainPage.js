import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions  } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import DrawerHeader from './Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

if(deviceHeight < deviceWidth){
  var profile_height = 7/20*deviceHeight 
  var profile_width = 7/20*deviceHeight 
}else{ 
  var profile_height = 1/2 *deviceWidth
  var profile_width = 1/2 *deviceWidth
} 

export default class MainPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'หน้าหลัก',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../pics/temp1.png')}
        style={styles.icon}
      />
    ),
    
  })
  /*
  static navigationOptions = ({navigation}) => ({
      title: 'Main',
      headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
     
  })
  */
 
  render() {
    return (
      
      <View style={styles.container}>
        <DrawerHeader {...this.props}/>
        <View style={styles.page}> 
          
          <View style={styles.top} >
            <Image source={require('../../pics/background1.png')}
            style={{
              flex: 1,
              width: deviceWidth 
            }}
            />
          </View>
            
          <View style={styles.bot} />

          <View style={styles.popUp}>
            <Image
            source={require('../../pics/profile1.png')}  
            style={styles.profile}
            />
            <Text> wanchanok jampum </Text>
          </View>
          
          {/*{JSON.stringify(this.props.screenProps)}*/}
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
    position: 'relative' ,
    marginTop: 25
  },
  page: {
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' ,
    zIndex: 1
  },
  icon: {
    width: 24,
    height: 24,
  },
  profile: {
    borderRadius: 1/2*profile_height,
    height: profile_height,
    width: profile_width
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    width: deviceWidth,
    zIndex: 2
  },
  bot: {
    flex: 1
  },
  popUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    position: 'absolute',
    zIndex: 10
  }
});



