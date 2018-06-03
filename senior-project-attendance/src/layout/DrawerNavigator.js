import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

// import commonpage 
import Login from './Login'
import Register from './Register'
import Main from './MainPage'
import Profile from './ProfilePage'
import Selector from './Selector'

// import drawer group 
import CustomDrawer from './DrawerGroup/CustomDrawer'

// import subject manage group 
import SubjectManage_Selection from './SubjectManageGroup/SubjectManage_Selection'
import Manager from './SubjectManageGroup/Manager'

// import scanning group 
import Scanning_Selection from './ScanningGroup/Scanning_Selection'
import Scanner from './ScanningGroup/Scanner'
import ManualAttendance from './ScanningGroup/ManualAttendance'

// import dashboard group 
import Dashboard_Selection from './DashBoardGroup/Dashboard_Selection'
import Dashboard from './DashBoardGroup/Dashboard'

let deviceSize = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width
}
let drawerWidth = 0.75 * deviceSize.deviceWidth
export default createDrawerNavigator({
  // commonpage
  Register,
  Main,
  Profile,
  Selector,
  // drawer group
  // CustomDrawer,
  // subject manage group  
  SubjectManage_Selection,
  Manager,
  // scanning group 
  Scanning_Selection,
  Scanner,
  ManualAttendance,
  // dashboard group 
  Dashboard_Selection,
  Dashboard,
}
// , {
//     initialRouteName: 'Main',
//     drawerWidth,
//     // contentComponent: props => <CustomDrawer drawerProps={props} drawerWidth={drawerWidth} />,
//     // drawerOpenRoute: 'DrawerOpen',
//     // drawerCloseRoute: 'DrawerClose',
//     // drawerToggleRoute: 'DrawerToggle', 
//     // order: ['Main', 'Profile', 'SubjectManage_Selection', 'Scanning_Selection', 'Scanning_Selection'],
//     // contentOptions: {
//     //   activeTintColor: 'red',
//     // },
//     // navigationOptions: {
//     //   gesturesEnabled: false
//     // }
//   }
);

// class NavigatorMain extends React.Component {
//   constructor(props) {
//     super(props)
//     const { name, photoUrl, professorKey } = this.props.navigation.state.params
//     this.state = {
//       deviceSize: deviceSize,
//       userLogOn: {
//         name,
//         photoUrl,
//         professorKey
//       },
//       focus: {}
//     }
//   }
//   static router = DNMainPage.router
//   // setNameInScreenProps = (name) => this.setState({ name }) 

//   render() {
//     // const { screenProps: { deviceSize }, navigation: { state: { params: { photoUrl, professorKey } } } } = this.props // params = name, photoUrl, professorKey
//     // const { ...params } = this.props.navigation.state.params // professorID, photoUrl, name, phone 
//     // const { name } = this.state
//     // console.log('this.props.navigation', this.props.navigation)
//     const { deviceSize, userLogOn, focus } = this.state
//     return (
//       <DNMainPage navigation={this.props.navigation}
//         screenProps={{ deviceSize, userLogOn, focus }}
//       />
//     );
//   }
// }

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
