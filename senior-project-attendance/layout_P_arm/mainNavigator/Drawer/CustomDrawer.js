/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { Container, Content, Icon, Header, Body } from 'native-base'
//import styles from './SideMenu.style';
import {NavigationActions, DrawerItems} from 'react-navigation';
import { AppRegistry, StyleSheet, ScrollView, Text, View, Image} from 'react-native';

export default class CustomDrawer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Custom',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    
  })
  /*
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  */
 /*
  render () {
    return (
      <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image 
          style={styles.drawerImage}
          source={require('../../../icon/background1.png')} />
      </Body>
    </Header>
    <Content>
    <DrawerItems {...props} />
    </Content>

  </Container>
    );
    */
  
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 1
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Main')}>
              Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('SubjectManage')}>
                Page2
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Main')}>
                Page3
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
    
  }
}

CustomDrawer.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});

//AppRegistry.registerComponent('customDrawer', () => customDrawer)