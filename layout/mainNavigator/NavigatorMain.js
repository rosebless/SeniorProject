import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base'
import { DrawerNavigator, NavigationActions, DrawerItems, SafeAreaView  } from 'react-navigation' ; 

import MainPage from './MainPage'
import ProfilePage from './ProfilePage' 
import NavigatorSubject from './subjectNavigator/NavigatorSubject' 
import NavigatorScanning from './scanningNavigator/NavigatorScanning' 
import DashBoardPage from './DashBoard' 
import CustomDrawer from './Drawer/CustomDrawer'

export default class NavigatorMain extends React.Component {
    
  static navigationOptions = ({navigation}) => ({
    title: 'NM'
    })

  render() {
    return (

      <DNMainPage screenProps='abc'/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});

const DNMainPage = DrawerNavigator({
  Main: {
    screen: MainPage
  },
  Profile: {
    screen: ProfilePage
  },
  NSubject: {
    screen: NavigatorSubject
  },
  NScanning: {
    screen: NavigatorScanning
  },
  DashBoard: {
    screen: DashBoardPage
  },
},{    
    initialRouteName: 'Main' ,
    contentComponent: props => /*<Text style={styles.temp}>Hey I'm aaa najaaaa !!!</Text>*/ <DrawerItems {...props} /> ,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: 'red',
    },  
});


const CustomDrawerContentComponent = (props) => {

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../../pics/background1.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>
  
};
