//https://www.w3.org/Style/Examples/007/fonts.en.html
//Available fonts that we can use

//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Linking, Platform, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//COMPONENTS IMPORT
import MainScreen from './components/MainScreen'
import LoginScreen from './components/LoginScreen'
import StopsList from './components/resources/apiusage/DefaultStops'
import DefaultStudents from './components/resources/apiusage/DefaultStudents'
import Map from './components/Map'

export default class App extends Component {

  state = {
    reorderedStops: [],
    time: 0,
    distanceToBeTravelled : 0,
    coords: [],
    students: [],
    stops: []
  }

  constructor(props) {
    super(props)

    Text.defaultProps = Text.defaultProps || {}
    Text.defaultProps.style = { fontFamily: 'Courier New' }

    this.StudentDisplayTapped = this.StudentDisplayTapped.bind(this)
    this.getCheckInText = this.getCheckInText.bind(this)
    this.updateStops = this.updateStops.bind(this)
    this.setCoordinates = this.setCoordinates.bind(this)
    this.setDistanceToBeTravelled = this.setDistanceToBeTravelled.bind(this)
    this.setTime = this.setTime.bind(this)
    this.setReOrderedStops = this.setReOrderedStops.bind(this)
    this.resetStops = this.resetStops.bind(this)

    this.state.stops = StopsList.StopsList
    this.state.students = DefaultStudents.DefaultStudents

    for (var i = 0; i < this.state.stops.length; i++) {
      this.state.stops[i].students.splice(0);
    }

    for (var i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].isSelected) this.state.stops[this.state.students[i].stopnum-1].students.push(this.state.students[i]);
    }
    
  }

  resetStops() {
    this.state.stops = StopsList.StopsList
    this.state.students = DefaultStudents.DefaultStudents
    this.updateStops()
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

    this.setState(state => ({ stops: stops}), () => {
      //Callback
    })
  }

  /**
   * key must be of type number
   * This method updates the list of students when the student display is touched.
   */
  StudentDisplayTapped(key) {
    let newStateArray = this.state.students;
    let index = newStateArray.findIndex(element => element.key === key);
    if (newStateArray[index].isSelected) {
        newStateArray[index] = {...newStateArray[index], isSelected : false};
    } else {
        newStateArray[index] = {...newStateArray[index], isSelected : true};
    }
    this.setState(state => ({ students: newStateArray }), this.updateStops())
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

  setCoordinates(coordinates) {
      this.setState({ coords : coordinates }, () => {
        //Callback
      })
  }

  setDistanceToBeTravelled(distance) {
    this.setState({ distanceToBeTravelled : distance}, () => {
      //Callback
    })
  }

  setTime(time) {
    this.setState({ time : time }, () => {
      //Callback
    })
  }

  setReOrderedStops(newStops) {
    this.setState({ reorderedStops: newStops }, () => {
      //Callback
    })
  }
  

  render() {
    const Stack = createStackNavigator();
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
        <Stack.Screen style= {styles.app} name="Main">
          {props => <MainScreen {...props} setReOrderedStops={this.setReOrderedStops} setTime={this.setTime} setDistanceToBeTravelled = {this.setDistanceToBeTravelled} setCoordinates={this.setCoordinates} clicked={() => {this.clicked(this.state.stops)}} updateStops={this.updateStops} StudentDisplayTapped={this.StudentDisplayTapped} getCheckInText={this.getCheckInText} propstate={this.state}/>}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} resetStops={this.resetStops}/>}
          </Stack.Screen>
        <Stack.Screen name="Map">
          {props => <Map {...props} propState={this.state}/>}
        </Stack.Screen>
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
  }
});