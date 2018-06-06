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
        navigationOptions: {
            gesturesEnabled: false
        }
    })

const DrawerNavigator = createDrawerNavigator({
    // commonpage
    Main,
    Profile,
    Selector,
    // subject manage group  
    SubjectManage_Selection,
    Manager,
    TimePicker,
    // scanning group 
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
        // contentOptions: {
        //     activeTintColor: 'red',
        // },
        navigationOptions: {
            gesturesEnabled: false
        }
    })

export default createStackNavigator({
    Login,
    Register,
    // NavigatorMain 
    DrawerNavigator
}, {
        headerMode: 'none',
        headerVisible: false,
        navigationOptions: {
            gesturesEnabled: false
        }
    });

