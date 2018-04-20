import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
//port { Icon } from 'native-base'
import DrawerHeader from './Drawer/DrawerHeader';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import AppVarible from '../../Model/AppVarible'

export default class ScanningPage extends React.Component {
  /*
static navigationOptions = ({ navigation }) => ({ 
  title: 'เช็คชื่อ',
  //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
  //drawerLabel: 'Notification',
  
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require('../../pics/temp4.png')}
      style={styles.icon}
    />
  ),
})
*/
  constructor(props) {
    super(props)
    const { deviceSize: { deviceHeight, deviceWidth } } = AppVarible.appVarible
    this.state = {
      deviceHeight,
      deviceWidth
    }
  }
  render() {
    const {
      screenProps: { namePage },
      screenProps: { customNavigate },
      screenProps: { screenNavigate },
      screenProps: { focusVarible },
      ...props
    } = this.props;
    const { deviceHeight, deviceWidth } = this.state
    return (
      <View style={styles.container}>
        <DrawerHeader {...this.props} /*rootNavigation={rootNavigation}*/ />
        <View style={styles.top}>
          <Image source={require('../../pics/logo.png')} style={{ position: 'absolute', width: 320 / 367 * 3 / 20 * deviceHeight, height: 3 / 20 * deviceHeight, left: 0.05 * deviceWidth }} />
          <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > {namePage} </Text>
        </View>
        <View style={styles.bot} >
          <FlatList
            style={{ width: 0.9 * deviceWidth }}
            data={data}
            renderItem={({ item }) => (

              <View style={{
                margin: 1 / 10 * 0.1 * deviceHeight,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    customNavigate(screenNavigate)
                    focusVarible(item.subjectCode)
                  }} >
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 1 / 10 * deviceHeight,

                    backgroundColor: '#FFFF99',

                    borderRadius: 1 / 10 * 0.1 * deviceHeight

                  }}>
                    <Image
                      source={item.ImageProduct}
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
                        fontSize: 1 / 10 * 1 / 6 * this.state.deviceHeight
                      }]}>
                        {item.subjectCode}
                      </Text>
                      <Text style={[styles.itemDetail, {
                        fontSize: 1 / 10 * 1 / 6 * this.state.deviceHeight
                      }]}>
                        {item.subjectName}
                      </Text>
                      <Text style={[styles.itemCode, {
                        fontSize: 1 / 10 * 1 / 6 * this.state.deviceHeight
                      }]}>
                        ( Sec {item.section} )
                         </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

            )}
            keyExtractor={item => item.subjectCode}
          //numColumns={numColumns} 
          />
        </View>
      </View>
    );
  }
}
const data = [
  { subjectCode: '05016013', subjectName: 'FUNCTION OF COMPLEX VARIABLES', section: '1', ImageProduct: require('../../pics/temp3.png') },
  { subjectCode: '05016062', subjectName: 'SPECIAL TOPICS IN APPLIED MATHEMATICS FOR BUSINESS', section: '1', ImageProduct: require('../../pics/temp1.png') },
  { subjectCode: '05016117', subjectName: 'TIME SERIES AND SURVIVAL MODEL ESTIMATION', section: '1', ImageProduct: require('../../pics/temp2.png') },
  { subjectCode: '05016146', subjectName: 'SPECIAL TOPICS IN INFORMATIC MATHEMATICS 1', section: '1', ImageProduct: require('../../pics/temp5.png') },
  { subjectCode: '05016147', subjectName: 'SPECIAL TOPICS IN INFORMATIC MATHEMATICS 2', section: '1', ImageProduct: require('../../pics/temp2.png') },
  { subjectCode: '05016008', subjectName: 'NUMERICAL ANALYSIS 1', section: '1', ImageProduct: require('../../pics/temp3.png') },
  { subjectCode: '05016007', subjectName: 'PARTIAL DIFFERENTIAL EQUATION', section: '1', ImageProduct: require('../../pics/temp4.png') },
  { subjectCode: '05016048', subjectName: 'FINANCIAL MATHEMATICS', section: '1', ImageProduct: require('../../pics/temp3.png') },
  { subjectCode: '05016114', subjectName: 'MATHEMATICAL MODELLING IN INDUSTRY', section: '1', ImageProduct: require('../../pics/temp2.png') }
];
//const numColumns = 2; 

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
    justifyContent: 'center',

  },
  bot: {
    flex: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    //fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemDetail: {
    fontSize: 14,
    color: '#000',
    //fontWeight: '600',
  },
  itemCode: {
    //fontWeight: '600',
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
  },
});
