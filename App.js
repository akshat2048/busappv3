//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//COMPONENTS IMPORT
import MainScreen from './components/MainScreen'
import LoginScreen from './components/LoginScreen'
import StopsList from './apiusage/DefaultStops'
import RouteHandler from './apiusage/RouteHandler'

export default class App extends Component {

  state = {
    students: [{
      firstName: 'John',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 1,
      isSelected : false,
      key: 1
      }, {
      firstName: 'Jane',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 2,
      isSelected : false,
      key: 2
      },{
      firstName: 'Jack',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 3,
      isSelected : true,
      key: 3
      }, {
      firstName: 'Jaiden',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 4,
      isSelected : false,
      key: 4
      },{
      firstName: 'Steve',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 5,
      isSelected : false,
      key: 5
      }, {
      firstName: 'Jack',
      lastName: 'Johnson',
      stop: 'Westlake Drive',
      stopnum: 6,
      isSelected : true,
      key: 6
      }, {
        firstName: 'John',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 7,
        isSelected : false,
        key: 7
        }, {
        firstName: 'Jane',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 8,
        isSelected : false,
        key: 8
        },{
        firstName: 'Jack',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 9,
        isSelected : true,
        key: 9
        }, {
        firstName: 'Jaiden',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 10,
        isSelected : false,
        key: 10
        },{
        firstName: 'Steve',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 11,
        isSelected : false,
        key: 11
        }, {
        firstName: 'Jack',
        lastName: 'Jen',
        stop: 'Westlake Drive',
        stopnum: 12,
        isSelected : true,
        key: 12
        }, {
          firstName: 'John',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 13,
          isSelected : false,
          key: 13
          }, {
          firstName: 'Jane',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 14,
          isSelected : false,
          key: 14
          },{
          firstName: 'Jack',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 15,
          isSelected : true,
          key: 15
          }, {
          firstName: 'Jaiden',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 16,
          isSelected : false,
          key: 16
          },{
          firstName: 'Steve',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 17,
          isSelected : false,
          key: 17
          }, {
          firstName: 'Jack',
          lastName: 'Jen',
          stop: 'Westlake Drive',
          stopnum: 18,
          isSelected : true,
          key: 18
    }],
    stops: [{
      name: '123 Street Place',
      stopNum: 1,
      students: []
    }, {
      name: 'Westlake Drive',
      stopNum: 2,
      students: []
    }]
  }

  constructor(props) {
    super(props)

    this.StudentDisplayTapped = this.StudentDisplayTapped.bind(this)
    this.getCheckInText = this.getCheckInText.bind(this)
    this.updateStops = this.updateStops.bind(this)
    this.state.stops = StopsList.StopsList


    for (var i = 0; i < this.state.stops.length; i++) {
      this.state.stops[i].students.splice(0);
    }

    for (var i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].isSelected) this.state.stops[this.state.students[i].stopnum-1].students.push(this.state.students[i]);
    }

    console.log(this.state.stops)
  }

  /**
   * This is using brute force array updating, not efficient
   * This method updates the list of stops when the student display is touched.
   */
  updateStops() {
    let stops = this.state.stops

    for (var i = 0; i < stops.length; i++) {
        stops[i].students.splice(0);
    }

    for (var i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].isSelected) stops[this.state.students[i].stopnum-1].students.push(this.state.students[i]);
    }

    this.setState(state => ({ stops: stops}), () => (
      //Callback
      console.log("updateStops set")
    ))
  }

  /**
   * key must be of type number
   * This method updates the list of students when the student display is touched.
   */
  StudentDisplayTapped(key) {
    console.log("students");
    console.log("CHANGING VALUE");
    let newStateArray = this.state.students;
    console.log(newStateArray);
    let index = newStateArray.findIndex(element => element.key === key);
    console.log("INDEX IS " + index)
    if (newStateArray[index].isSelected) {
        newStateArray[index] = {...newStateArray[index], isSelected : false};
        console.log("NEW STATE ARRAY IS FALSE");
    } else {
        newStateArray[index] = {...newStateArray[index], isSelected : true};
        console.log("NEW STATE ARRAY IS TRUE");
    }
    this.setState(state => ({ students: newStateArray }), this.updateStops())
    console.log(this.state.students);
  }

  /**
   * This method gets the checkIn text, counts up the list of selected students
   */
  getCheckInText() {
    let string = ""
    let counter = 0;
    for (var i = 0; i < this.state.students.length; i++) { 
      if (this.state.students[i].isSelected) counter++;
    }
    string += counter
    string += " of "
    string += this.state.students.length
    return string
  }

  render() {
    const Stack = createStackNavigator();
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
        <Stack.Screen style= {styles.app} name="Main">
          {props => <MainScreen {...props} updateStops={this.updateStops} StudentDisplayTapped={this.StudentDisplayTapped} getCheckInText={this.getCheckInText} propstate={this.state} routeHandler={RouteHandler}/>}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});