//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//COMPONENTSIMPORT
import CheckIn from './CheckIn'
import StudentsDisplay from './StudentsDisplay'
import Stops from './Stops'
import RouteButton from './RouteButton'

export default class MainScreen extends Component {
    state = {
      busNumber: 'WBSD Bus 33'
    }
    
      constructor(props) {
        super(props)
        
        this.state = this.props.propstate
       // this.getRoute = this.getRoute.bind(this);
      }
      
      render() {
        console.log("width is " + ((Dimensions.get('window').width)))
          return (
          <View style={styles.app}>
            
            <View style = {styles.leftPanel}>
            <View style = {styles.busNumberView}>
                  <Text style = {styles.BusNumber}>WBSD Bus 33</Text>
              </View>
              
              <StudentsDisplay students={this.state.students} cbfunction={(key) => {
                this.props.StudentDisplayTapped(key)
                this.props.updateStops()
              }}/>
            </View>
            <View style = {styles.midPanel}>
              <CheckIn checkInText={this.props.getCheckInText()}/>
              <Stops stops = {this.state.stops}/>
              <RouteButton stops = {this.state.stops.filter(element => (element.students.length >= 1))} routeHandler = {this.props.routeHandler} _onClick={this.props.clicked}/>
            </View>
          </View> 
          )
      }

      // getRoute() {
      //   const stops1 = this.state.stops.filter(element => (element.students.length == 1));
      //   console.log("GET ROUTE STOPS")
      //   console.log(stops1);
      //   return stops1
      // }
}

const styles = StyleSheet.create({
    app: {
      flex: 1,
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      // marginBottom: ((12/912) * Dimensions.get('window').height)
      marginBottom: 0,
      backgroundColor: '#FDF5E2'
      
    },
    leftPanel: {
      flexDirection: 'column',
      width: ((Dimensions.get('window').width/2)),
      height: Dimensions.get('window').height
    },
    midPanel: {
      flexDirection: 'column',
      width: ((2 * Dimensions.get('window').width/4)) - 12,
      height: Dimensions.get('window').height - 10,
      marginRight: ((12/912) * Dimensions.get('window').height)
    },
    yourStudents: {
      marginLeft: ((12/912) * Dimensions.get('window').height),
      marginBottom: 0,
      marginTop: ((12/912) * Dimensions.get('window').height),
      paddingBottom: ((-3/912) * Dimensions.get('window').height),
    },
    busNumberView: {
      marginTop : ((12/912) * Dimensions.get('window').height),
      backgroundColor: 'white',
      marginLeft: ((12/912) * Dimensions.get('window').height),
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius : 20,
      borderWidth : ((1/912) * Dimensions.get('window').height),
      borderTopColor : 'black',
      padding: ((12/912) * Dimensions.get('window').height)
    }, 
    BusNumber: {
      fontSize: ((28/912) * Dimensions.get('window').height),
      color: 'black',
      justifyContent: "center",
      alignContent: 'center',
      backgroundColor : 'white',
      flexDirection: 'row',
      //width: ((2 * Dimensions.get('window').width/4)) - 12,
      //height: Dimensions.get('window').height - 720,
      //borderColor : 'black', 
      //paddingTop : ((8/912) * Dimensions.get('window').height),
      paddingLeft : ((Dimensions.get('window').width/20)) - 20,
            
      //font change
      
    }
})