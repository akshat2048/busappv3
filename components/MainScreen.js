//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//COMPONENTS IMPORT
import CheckIn from './CheckIn'
import StudentsDisplay from './StudentsDisplay'
import Stops from './Stops'
import RouteButton from './RouteButton'

export default class MainScreen extends Component {
    state = {
    }
    
      constructor(props) {
        super(props)
        
        this.state = this.props.propstate
        this.getRoute = this.getRoute.bind(this);
      }
      
      render() {
        console.log("width is " + ((Dimensions.get('window').width)))
          return (
          <View style={styles.app}>
            <View style = {styles.leftPanel}>
              <CheckIn checkInText={this.props.getCheckInText()}/>
              <Text style={styles.yourStudents}>Your Students</Text>
              <StudentsDisplay students={this.state.students} cbfunction={(key) => {
                this.props.StudentDisplayTapped(key)
                this.props.updateStops()
              }}/>
            </View>
            <View style = {styles.midPanel}>
              <Text style={styles.yourStudents}>Your Stops</Text>
              <Stops stops = {this.state.stops}/>
              <RouteButton stops = {this.getRoute()} routeHandler = {this.props.routeHandler}/>
            </View>
          </View> 
          )
      }

      getRoute() {
        const stops1 = this.state.stops.filter(element => (element.students.length == 1));
        console.log("GET ROUTE STOPS")
        console.log(stops1);
        return stops1
      }
    }

const styles = StyleSheet.create({
    app: {
      flex: 1,
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      // marginBottom: ((12/912) * Dimensions.get('window').height)
      marginBottom: 0
    },
    leftPanel: {
      flexDirection: 'column',
      width: ((Dimensions.get('window').width/2)),
      height: Dimensions.get('window').height
    },
    midPanel: {
      flexDirection: 'column',
      width: ((Dimensions.get('window').width/2)) - 12,
      height: Dimensions.get('window').height - 10,
      marginRight: ((12/912) * Dimensions.get('window').height)
    },
    yourStudents: {
      marginLeft: ((12/912) * Dimensions.get('window').height),
      marginBottom: 0,
      marginTop: ((12/912) * Dimensions.get('window').height),
      paddingBottom: ((-3/912) * Dimensions.get('window').height),
    }
})