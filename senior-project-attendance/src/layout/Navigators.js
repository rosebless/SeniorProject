import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

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
import TimePicker from './SubjectManageGroup/TimePicker'

// import scanning group 
import Scanning_Selection from './ScanningGroup/Scanning_Selection'
import Scanner from './ScanningGroup/Scanner'
import ManualAttendance from './ScanningGroup/ManualAttendance'

// import dashboard group 
import Dashboard_Selection from './DashBoardGroup/Dashboard_Selection'
import Dashboard from './DashBoardGroup/Dashboard'
import EditPage from './DashBoardGroup/EditPage'

let drawerWidth = 0.8 * Dimensions.get('window').width

const ScannerNavigator = createStackNavigator({
    Scanner,
    ManualAttendance,
}, {
        headerMode: 'none',
        headerVisible: false,
        //header: null
        navigationOptions: {
            gesturesEnabled: false
        }
    })

const DashboardNavigator = createStackNavigator({
    Dashboard,
    EditPage
}, {
        headerMode: 'none',
        headerVisible: false,
        //header: null
        navigationOptions: {
            gesturesEnabled: false
        }
    })

const DrawerNavigator = createDrawerNavigator({
    // commonpage
    Main,
    Profile,
    Selector,
    // drawer group
    // CustomDrawer,
    // subject manage group  
    SubjectManage_Selection,
    Manager,
    TimePicker,
    // // scanning group 
    Scanning_Selection,
    ScannerNavigator, 
    // dashboard group 
    Dashboard_Selection,
    DashboardNavigator   
}, {
        initialRouteName: 'Main',
        drawerWidth,
        contentComponent: ({ navigation, screenProps }) => <CustomDrawer drawerProps={{ navigation, screenProps, drawerWidth }} />,
        // drawerOpenRoute: 'DrawerOpen',
        // drawerCloseRoute: 'DrawerClose',
        // drawerToggleRoute: 'DrawerToggle', 
        // order: ['Main', 'Selector', 'Profile', 'SubjectManage_Selection', 'Scanning_Selection', 'Dashboard_Selection'],
        contentOptions: {
            activeTintColor: 'red',
        },
        navigationOptions: {
            gesturesEnabled: false
        }
    })

// class NavigatorMain extends React.Component {
//   static router = DrawerNavigator.router
//   render() {
//     return (
//       <DrawerNavigator navigation={this.props.navigation}
//         screenProps={{ ...this.props.screenProps }}
//       />
//     );
//   }
// } 

// let drawerWidth = 0.8 * Dimensions.get('window').width

// const Drawer = createDrawerNavigator({
//         // commonpage
//     Main,
//     Profile,
//     Selector,
//     // drawer group
//     // CustomDrawer,
//     // subject manage group  
//     SubjectManage_Selection,
//     Manager,
//     // // scanning group 
//     Scanning_Selection,
//     Scanner,
//     ManualAttendance,
//     // dashboard group 
//     Dashboard_Selection,
//     Dashboard
// }, {
//         initialRouteName: 'Main',
//         drawerWidth,
//         // contentComponent: props => <CustomDrawer screenProps={{ deviceSize, drawerWidth, goBack, name, photoUrl, drawerProps: activeItemKey ? { ...props, activeItemKey } : { ...props }, removeActiveItemKey: this.removeActiveItemKey }} />,
//         // drawerOpenRoute: 'DrawerOpen',
//         // drawerCloseRoute: 'DrawerClose',
//         // drawerToggleRoute: 'DrawerToggle',
//         contentOptions: {
//             activeTintColor: 'red',
//         },
//         navigationOptions: {
//             gesturesEnabled: false
//         }
//     })

export default createStackNavigator({
    Login,
    Register,
    // NavigatorMain 
    DrawerNavigator
}, {
        headerMode: 'none',
        headerVisible: false,
        //header: null
        navigationOptions: {
            gesturesEnabled: false
        }
    });


// let deviceSize = {
//     deviceHeight: Dimensions.get('window').height,
//     deviceWidth: Dimensions.get('window').width
// }
// let drawerWidth = 0.75 * deviceSize.deviceWidth
// const DrawerNavigator = createDrawerNavigator({
//     // commonpage
//     Register,
//     Main,
//     Profile,
//     Selector,
//     // drawer group
//     // CustomDrawer,
//     // subject manage group  
//     SubjectManage_Selection,
//     Manager,
//     // scanning group 
//     Scanning_Selection,
//     Scanner,
//     ManualAttendance,
//     // dashboard group 
//     Dashboard_Selection,
//     Dashboard,
// }
//     // , {
//     //     initialRouteName: 'Main',
//     //     drawerWidth,
//     //     // contentComponent: props => <CustomDrawer drawerProps={props} drawerWidth={drawerWidth} />,
//     //     // drawerOpenRoute: 'DrawerOpen',
//     //     // drawerCloseRoute: 'DrawerClose',
//     //     // drawerToggleRoute: 'DrawerToggle', 
//     //     // order: ['Main', 'Profile', 'SubjectManage_Selection', 'Scanning_Selection', 'Scanning_Selection'],
//     //     // contentOptions: {
//     //     //   activeTintColor: 'red',
//     //     // },
//     //     // navigationOptions: {
//     //     //   gesturesEnabled: false
//     //     // }
//     //   }
// );