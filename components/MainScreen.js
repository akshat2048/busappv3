//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

//COMPONENTS IMPORT
import CheckIn from './CheckIn'
import StudentsDisplay from './StudentsDisplay'
import Stops from './Stops'
import RouteButton from './RouteButton'
import DistanceTraveled from './DistanceTraveled'

var propSetCoords = null
var propNavigation = null
var propSetDistanceToBeTravelled = null
var propSetTime = null
var propSetReOrderedStops = null

export default class MainScreen extends Component {
  state = {
    busNumber: 'WBSD Bus 33     Distance Traveled: 2.45 miles'
  }

  constructor(props) {
    super(props)

    this.state = this.props.propstate
    // this.getRoute = this.getRoute.bind(this);
    this._onClick = this._onClick.bind(this)
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.leftPanel}>
          <View style={styles.busNumberView}>
            <Text style={styles.BusNumber}>WBSD Bus 33</Text>
            <DistanceTraveled />
          </View>
          <StudentsDisplay students={this.state.students} cbfunction={(key) => {
            this.props.StudentDisplayTapped(key)
            this.props.updateStops()
          }} />
        </View>
        <View style={styles.midPanel}>
          <CheckIn checkInText={this.props.getCheckInText()} />
          <Stops stops={this.state.stops} />
          <RouteButton stops={this.state.stops.filter(element => (element.students.length >= 1))} _onClick={this._onClick} />
        </View>
      </View>
    )
  }

  _onClick() { //refactored

    //props that are modified
    propSetDistanceToBeTravelled = this.props.setDistanceToBeTravelled
    propSetTime = this.props.setTime
    propSetCoords = this.props.setCoordinates
    propNavigation = this.props.navigation
    propSetReOrderedStops = this.props.setReOrderedStops

    //local vars
    var reorderedStops = []
    var geome = []
    var time = 0
    var dist = 0

    //Build the hereMapsAPICall
    function hereMapsAPIBuilder(stops) {
      let APICall = 'https://fleet.ls.hereapi.com/2/calculateroute.json?'
      APICall += 'apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM'
      APICall += '&avoidTurns=uTurn,uTurnAtWaypoint'
      APICall += '&mode=fastest;truck;traffic:disabled'
      APICall += '&waypoint0=43.078780,-88.089550';

      //filter in any stops with length >= 1
      let optimizedStops = stops.filter((element) => {
        return (element.students.length >= 1)
      });


      async function getStopsData(stops) {
        //Retrieve all stops latitude and longitude
        for (let i = 0; i < optimizedStops.length; i++) {
          let address = optimizedStops[i].name;
          address = address.replace(/ /g, '+');
          address = address.replace(/&/g, '');
          address = address.replace('&', '');

          function getLatitudeLongitudeHelper(stops, data, counter) {
            optimizedStops[counter].latitude = data.results[0].geometry.location.lat;
            optimizedStops[counter].longitude = data.results[0].geometry.location.lng;
          }

          await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBF6Ord-pAW1bdfydjAzOZYkU-PnqbaCKQ')
            .then(response => response.json())
            .then(data => getLatitudeLongitudeHelper(stops, data, i))
            .catch((error) => {
              console.error('Error:', error);
            });
        }

        //Add stops into the APICall
        for (let i = 1; i < optimizedStops.length; i++) {
          APICall += '&waypoint' + (i) + '=' + optimizedStops[i].latitude + ',' + optimizedStops[i].longitude + ';sort';
        }

        //Final stop edit
        APICall = APICall.substring(0, APICall.length - 4)

        return stops;
      }

      function getOptimizedBusRoute(stops) {
        console.log(optimizedStops);

        fetch(APICall)
          .then(response => response.json())
          .then(results => {
            console.log(results.response.route[0].waypoint);
            getMapBoxURL(results.response.route[0].waypoint)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        console.log(optimizedStops);
      }

      async function getMapBoxURL(waypoints) {
        //https://docs.mapbox.com/api/navigation/directions/
        let MapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/-88.089550,43.078780' + ';';

        let newWaypoints = waypoints
        //newWaypoints = newWaypoints.sort((a, b) => (a.seqNrOnRoute - b.seqNrOnRoute))
        console.log(newWaypoints)
        newWaypoints.forEach((element, i) => {

          if (i == newWaypoints.length - 1) {
            MapboxAPI += element.mappedPosition.longitude + ',' + element.mappedPosition.latitude + '?';
          } else {
            MapboxAPI += element.mappedPosition.longitude + ',' + element.mappedPosition.latitude + ';';
          }
          //console.log(waypoints[i].waypoint_index);

          var stopObject = {
            name: '',
            stopNum: 0,
            latitude: 0,
            longitude: 0
          }
          stopObject.latitude = element.mappedPosition.latitude
          stopObject.longitude = element.mappedPosition.longitude
          stopObject.name = element.seqNrOnRoute + 1
          stopObject.stopNum = element.seqNrOnRoute
          reorderedStops.push(stopObject)
        });

        //   MapboxAPI += '&radiuses=';
        //  for(let i = 0; i < waypoints.length; i++){
        //    MapboxAPI += '100;'
        //  }
        MapboxAPI += '&steps=true&geometries=geojson&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
        console.log(MapboxAPI);

        var geo = await fetch(MapboxAPI)
          .then(response => response.json())
          .then(results => {
            console.log(results.routes[0].geometry.coordinates)
            results.routes[0].legs.forEach(element => {
              element.steps.forEach(innerElement => {
                innerElement.geometry.coordinates.forEach(innerInnerElement => {
                  geome.push(innerInnerElement)
                });
              });
            });
            dist = (results.routes[0].distance / 1609).toFixed(3)
            time = (results.routes[0].duration / 60).toFixed(2)
          })
          .catch((error) => {
            console.error('Error:', error);
          }).finally(() => {
            console.log("setting coords")
            propSetCoords(geome)
            propNavigation.navigate("Map")
            propSetReOrderedStops(reorderedStops)
            propSetTime(time)
            propSetDistanceToBeTravelled(dist)
          })
        return geo;
      }

      getStopsData(stops.filter((element, index) => {
        return (element.students.length >= 1)
      })).then((value) => {
        getOptimizedBusRoute(value, this);
      })
    }

    hereMapsAPIBuilder(this.state.stops)
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginBottom: 0,
    backgroundColor: '#FDF5E2'
  },
  leftPanel: {
    flexDirection: 'column',
    width: ((Dimensions.get('window').width / 2)),
    height: Dimensions.get('window').height
  },
  midPanel: {
    flexDirection: 'column',
    width: ((2 * Dimensions.get('window').width / 4)) - 12,
    height: Dimensions.get('window').height - 10,
    marginRight: ((12 / 912) * Dimensions.get('window').height)
  },
  yourStudents: {
    marginLeft: ((12 / 912) * Dimensions.get('window').height),
    marginBottom: 0,
    marginTop: ((12 / 912) * Dimensions.get('window').height),
    paddingBottom: ((-3 / 912) * Dimensions.get('window').height),
  },
  busNumberView: {
    marginTop: ((12 / 912) * Dimensions.get('window').height),
    backgroundColor: 'white',
    marginLeft: ((12 / 912) * Dimensions.get('window').height),
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
    borderWidth: ((1 / 912) * Dimensions.get('window').height),
    borderTopColor: 'black',
    padding: ((12 / 912) * Dimensions.get('window').height)
  },
  BusNumber: {
    fontSize: ((28 / 912) * Dimensions.get('window').height),
    fontFamily: 'Chalkduster',
    color: 'black',
    justifyContent: "center",
    alignContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: ((Dimensions.get('window').width / 20)) - 20,
  }
})