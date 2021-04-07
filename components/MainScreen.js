//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const polyline = require('@mapbox/polyline')

//COMPONENTSIMPORT
import CheckIn from './CheckIn'
import StudentsDisplay from './StudentsDisplay'
import Stops from './Stops'
import RouteButton from './RouteButton'

var propSetCoords = null
var propNavigation = null

export default class MainScreen extends Component {
    state = {
      busNumber: 'WBSD Bus 33'
    }
    
      constructor(props) {
        super(props)
        
        this.state = this.props.propstate
       // this.getRoute = this.getRoute.bind(this);
       this._onClick = this._onClick.bind(this)
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
              <RouteButton stops = {this.state.stops.filter(element => (element.students.length >= 1))} routeHandler = {this.props.routeHandler} _onClick={this._onClick}/>
            </View>
          </View> 
          )
      }


      _onClick() {
        propSetCoords = this.props.setCoordinates
        propNavigation = this.props.navigation
        function clicked(stops) {
          let APICall = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-88.089550,43.078780' + ';';
          let optimizedStops = stops.filter((element) => {
            return (element.students.length >= 1)
          });
      
          async function getLatitudeLongitude(stops){
            for(let i = 0; i < stops.length; i++){
              
              let address = stops[i].name;
              address = address.replace(/ /g, '+');
              address = address.replace(/&/g, '');
              console.log(address);
              await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBF6Ord-pAW1bdfydjAzOZYkU-PnqbaCKQ')
              .then(response => response.json())
              .then(data => getLatitudeLongitudeHelper(stops, data, i))
              .catch((error) => {
                console.error('Error:', error);
              });
              //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
            }
      
            APICall += '&bearings=';
            for(let i = 0; i < stops.length; i++){
              APICall += '45,180;'
            }
            APICall += '&radiuses=';
            for(let i = 0; i < stops.length; i++){
              APICall += '100;'
            }
      
            APICall += '&roundtrip=false&source=first&destination=last&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
            console.log(APICall);
            optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
            return stops;
          }
      
          function getLatitudeLongitudeHelper(stops, data, counter) {
              console.log(data.results[0].geometry.location.lat);
              console.log(data.results[0].geometry.location.lng)
              optimizedStops[counter].latitude = data.results[0].geometry.location.lat;
              optimizedStops[counter].longitude = data.results[0].geometry.location.lng;
              if(counter === (optimizedStops.length) - 1){
                APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + '?';
              }
              else {
                APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + ';';
              }
          }
          
          function getOptimizedBusRoute(stops){
            console.log(APICall);
            console.log(optimizedStops);
            fetch(APICall)
            .then(response => response.json())
            .then(results => {
              getMapBoxURL(results.waypoints).then((Coords) => {
              })
            })
            // .then(value => {
            //   console.log(value)
            //   geom = value
            // })
            .catch((error) => {
              console.error('Error:', error);
            });
            console.log(optimizedStops);
          }
      
          async function getMapBoxURL(waypoints) {
            //https://docs.mapbox.com/api/navigation/directions/
            let MapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/-88.089550,43.078780' + ';';
            for(let i = 0; i < waypoints.length; i++){
                if(i == waypoints.length - 1){
                    MapboxAPI += waypoints[i].location[0] + ',' + waypoints[i].location[1] + '?';
                    break;
                }
                MapboxAPI += waypoints[i].location[0] + ',' + waypoints[i].location[1] + ';';
            }
            MapboxAPI += '&geometries=geojson&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
            //Polyline
            //MapboxAPI += '&geometries=polyline6&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
            console.log(MapboxAPI);
            var geome = {}
            var geo = await fetch(MapboxAPI)
            .then(response => response.json())
            .then(results => {
              //GeoJSON decoding
              console.log(results.routes[0].geometry.coordinates)
              //setCoords(results.routes[0].geometry.coordinates);
              geome = results.routes[0].geometry.coordinates

              //Polyline decoding
              //geome = polyline.decode(results.routes[0].geometry)

            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                console.log("setting coords")
                propSetCoords(geome)
                propNavigation.navigate("Map")
            })
            return geo;
          }
      
          getLatitudeLongitude(stops.filter((element, index) => {
            return (element.students.length >= 1)
          }), stops[stops.length-1])
          .then((value) => {
            getOptimizedBusRoute(value, this);
          })
        }
        clicked(this.state.stops) 
      }
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