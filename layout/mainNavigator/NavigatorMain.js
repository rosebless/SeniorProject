import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base'
import { DrawerNavigator, NavigationActions, DrawerItems, SafeAreaView } from 'react-navigation';

import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import NavigatorSubject from './subjectNavigator/NavigatorSubject'
import NavigatorScanning from './scanningNavigator/NavigatorScanning'
import NavigatorDashboard from './dashBoardNavigator/NavigatorDashboard'
import CustomDrawer from './Drawer/CustomDrawer'
import AppVarible from '../../Model/AppVarible'

export default class NavigatorMain extends React.Component {

  constructor(props) {
    super(props)
    const { deviceHeight, deviceWidth } = AppVarible.appVarible.deviceSize
    this.state = {
      deviceHeight,
      deviceWidth
    }
  }



  static navigationOptions = ({ navigation }) => ({
    title: 'NM'
  })

  render() {
    const { deviceHeight, deviceWidth } = this.state
    const drawerWidth = 0.75 * deviceWidth
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
      NDashBoard: {
        screen: NavigatorDashboard
      },
    }, {
        initialRouteName: 'Main',
        drawerWidth,
        contentComponent: props => <CustomDrawer screenProps={{ drawerWidth, drawerProps: { ...props } }} />,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentOptions: {
          activeTintColor: 'red',
        },
        navigationOptions: {
          gesturesEnabled: false
        }
      });
    return (
      <DNMainPage
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
