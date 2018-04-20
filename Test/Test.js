
// import React from 'react';
// import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Button, Image, Animated } from 'react-native';
// import { BarCodeScanner, Permissions } from 'expo';
// import AppVarible from '../Model/AppVarible' 

/*
export default class Scanner extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      offsetY: new Animated.Value(0),
    }
    
    this.animateGo = this.animateGo.bind(this) 
  }
  


  render() {
    let animeteStyle = { transform: [{translateY: this.state.offsetY}] }
    return (
      <View style={styles.container}>
      <Animated.View style={[styles.topBar, animeteStyle, { height: 80 }]}>
        <Image
          source={require('../pics/temp4.png')}
          style={[styles.statusIcon, {
            height: 50,
            width: 50,
          }]}
        />
       
      </Animated.View>
        <Button title="Test" onPress={()=>{this.animateGo()}} />
      </View>
    );
  }


  animateGo = () => { 
    Animated.sequence([
      Animated.timing(
      this.state.offsetY, { 
        toValue: 80,
        duration: 1000,
       }),
       Animated.timing(
        this.state.offsetY, { 
          toValue: 0,
          duration: 1000,
         })]
    )
    .start();

    //return this.state.students.map(student => <OutPutPopUP key={student} icon={statusIcon} text={outputText} />)

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topBar: {
    position: 'absolute',
    top: -80,
    left: 0,
    right: 0,
    //backgroundColor: rgb(255,255,255,0.3),
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    marginLeft: 10,
  },
  codeText: {
    flex: 1,
    color: '#000',
    textAlignVertical: "center",
    textAlign: 'center',
  },
  successText: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  summitButtonText: {
    //flex: 1,
    textAlignVertical: 'bottom',
    textAlign: 'center',
    backgroundColor: '#0070C0',
    color: '#FFFFFF',
  }
});

class OutPutPopUP extends React.Component {
  constructor(props) {
    super(props)
    const { deviceSize: { deviceHeight, deviceWidth } } = AppVarible.appVarible
    this.state = {
      deviceHeight,
      deviceWidth,
      yPosition: new Animated.Value(1 / 10 * deviceHeight)
    }
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.yPosition, {
        toValue: 0,
        duration: 500
      }),
      Animated.timing(this.state.yPosition, {
        toValue: 1 / 10 * this.state.deviceHeight,
        duration: 500
      })
    ])
      .start();       // many event use Animated.parallel([event1,event2])

  }

  render() {
    let animetionStyle = {
      transform: [{ transparentY: this.state.yPosition }]
    }
    const { deviceHeight, deviceWidth } = this.state
    return (
      <Animated.View style={[styles.topBar, animetionStyle, { height: 1 / 10 * deviceHeight }]}>
        <Image
          source={this.props.icon}
          style={[styles.statusIcon, {
            height: 1 / 10 * 7 / 10 * deviceHeight,
            width: 1 / 10 * 7 / 10 * deviceHeight,
          }]}
        />
        <Text numberOfLines={1} style={[styles.codeText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
          {this.props.key}
        </Text>
        <Text style={[styles.successText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
          {this.props.text}
        </Text>
      </Animated.View>
    );
  }
}
*/

// export default class Test extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = { 
//       counter: 0, 
//       students: [] 
//     }
//   }

//   count = () => {
//     let counter = this.state.counter 
//     let students = this.state.students 
//     counter++ 
//     students.push(counter)
//     this.setState({ students, counter })

//   }

//   summit = () => { 
//     let re = '' 
//     this.state.students.forEach(s => {
//       re = re + s + '\n'
//     });
//     Alert.alert(
//       'ABC eiei', 
//       re ,
//       [
//         { text: 'ใช่', onPress: () => { AppVarible.appVarible.navigationSaved.scanning.navigate('ByPassToDashboard') } },
//         { text: 'ไม่ใช่', onPress: () => { } },
//       ],
//       { cancellable: false }
//     )
//   }

//   render() {
//     return (
//       <View>
//         <Text>{this.state.counter}</Text>
//         <Text>{this.state.students}</Text>
//       <Button title='count' onPress={()=>{this.count()}} /> 
//       <Button title='Summit' onPress={()=>{this.summit()}} /> 
//       </View>
//     );
//   }

// }

// test = { 
//   a: 'a'
// }

// console.log(test.b,test['b']) 

// if(test['b']){
//   console.log(test['b']) 
// } else {
//   console.log('test') 
// } 

// var test = '57050070@kmitl.ac.th' 

// var s = test.split('.').join('')

// console.log(s) 

// //var test1

// if(test1){
//   console.log('true')
// } else {
//   console.log('flase')
// }