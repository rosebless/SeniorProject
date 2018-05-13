import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import Main from './MainPage'
import Profile from './ProfilePage'
import NSubject from './subjectNavigator/NavigatorSubject'
import NScanning from './scanningNavigator/NavigatorScanning'
import NDashboard from './dashBoardNavigator/NavigatorDashboard'
import CustomDrawer from './Drawer/CustomDrawer'

let deviceSize = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width
}
let drawerWidth = 0.75 * deviceSize.deviceWidth
const DNMainPage = createDrawerNavigator({
  Main,
  Profile,
  NSubject,
  NScanning,
  NDashboard,
}, {
    initialRouteName: 'Main',
    drawerWidth,
    contentComponent: props => <CustomDrawer drawerProps={props} drawerWidth={drawerWidth} />,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: 'red',
    },
    navigationOptions: {
      gesturesEnabled: false
    }
  });

export default class NavigatorMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.navigation.state.params.name
    }
  }
  static router = DNMainPage.router
  setNameInScreenProps = (name) => this.setState({ name })
  render() {
    const { screenProps: { deviceSize }, navigation: { state: { params: { photoUrl, professorKey } } } } = this.props // params = name, photoUrl, professorKey
    // const { ...params } = this.props.navigation.state.params // professorID, photoUrl, name, phone 
    const { name } = this.state
    console.log('this.props.navigation', this.props.navigation)
    return (
      <DNMainPage navigation={this.props.navigation}
        screenProps={{ deviceSize, name, photoUrl, professorKey, setNameInScreenProps: this.setNameInScreenProps }}
      />
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


// console.log(0.75*AppVarible.appVarible.deviceSize.deviceWidth)
// //console.log(DNMainPage.drawerWidth)
// console.log(AppVarible.appVarible.deviceSize.deviceWidth)
// console.log(AppVarible.appVarible.deviceSize.deviceHeight)
// const DNMainPage = DrawerNavigator({
//   Main: {
//     screen: MainPage
//   },
//   Profile: {
//     screen: ProfilePage
//   },
//   NSubject: {
//     screen: NavigatorSubject
//   },
//   NScanning: {
//     screen: NavigatorScanning
//   },
//   NDashBoard: {
//     screen: NavigatorDashboard
//   },
// },{    
//     initialRouteName: 'Main' , 
//    drawerWidth: 0.75*AppVarible.appVarible.deviceSize.deviceWidth,
//   contentComponent: props => <CustomDrawer screenProps={ { drawerProps: {...props} } } /> ,
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle',
//     contentOptions: {
//       activeTintColor: 'red',
//     },  
//     navigationOptions:{
//       gesturesEnabled: false
//   }
// });


// const CustomDrawerContentComponent = (props) => {

//   <Container>
//     <Header style={styles.drawerHeader}>
//       <Body>
//         <Image
//           style={styles.drawerImage}
//           source={require('../../pics/background1.png')} />
//       </Body>
//     </Header>
//     <Content>
//       <DrawerItems {...props} />
//     </Content>

//   </Container>

// };
