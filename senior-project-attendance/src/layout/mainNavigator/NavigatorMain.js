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

export default class NavigatorMain extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activeItemKey: undefined }
    // const { screenProps: { deviceSize }, navigation: { goBack, state: { params: { name, photoUrl } } } } = this.props
    // const drawerWidth = 0.75 * deviceSize.deviceWidth
  }

  setActiveItemKey = (key) => {
    this.setState({
      activeItemKey: key
    })
  }

  removeActiveItemKey = () => {
    this.setState({
      activeItemKey: undefined
    })
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'NM'
  })

  render() { 
    console.log('NM', this.props)
    const { screenProps: { deviceSize }, navigation: { goBack, state: { params: { name, photoUrl, ...rest } } } } = this.props // rest = { professorID, name }
    // const { ...params } = this.props.navigation.state.params // professorID, photoUrl, name, phone 
    const drawerWidth = 0.75 * deviceSize.deviceWidth
    const { activeItemKey } = this.state
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
        contentComponent: props => <CustomDrawer screenProps={{ deviceSize, drawerWidth, goBack, name, photoUrl, drawerProps: activeItemKey ? { ...props, activeItemKey } : { ...props } , removeActiveItemKey: this.removeActiveItemKey }} />,
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
        screenProps={{ deviceSize, name, photoUrl, ...rest, configActiveItemKey: { setActiveItemKey: this.setActiveItemKey, removeActiveItemKey: this.removeActiveItemKey } }}
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
