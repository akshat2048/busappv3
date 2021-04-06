//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Linking, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//COMPONENTS IMPORT
import MainScreen from './components/MainScreen'
import LoginScreen from './components/LoginScreen'
import StopsList from './apiusage/DefaultStops'
import RouteHandler from './apiusage/RouteHandler'
import Map from './components/web/Map'

export default class App extends Component {

  state = {
    students: [{
      firstName: 'John',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 1,
      isSelected : true,
      key: 1
      }, {
      firstName: 'Jane',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 2,
      isSelected : true,
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
      isSelected : true,
      key: 4
      },{
      firstName: 'Steve',
      lastName: 'Smith',
      stop: '123 Street Place',
      stopnum: 5,
      isSelected : true,
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
        isSelected : true,
        key: 7
        }, {
        firstName: 'Jane',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 8,
        isSelected : true,
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
        isSelected : true,
        key: 10
        },{
        firstName: 'Steve',
        lastName: 'Wilson',
        stop: '123 Street Place',
        stopnum: 11,
        isSelected : true,
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
          isSelected : true,
          key: 13
          }, {
          firstName: 'Jane',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 14,
          isSelected : true,
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
          isSelected : true,
          key: 16
          },{
          firstName: 'Steve',
          lastName: 'Wilson',
          stop: '123 Street Place',
          stopnum: 17,
          isSelected : true,
          key: 17
          }, {
          firstName: 'Stop',
          lastName: 'Final',
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


  clicked(stops) {
    let APICall = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-88.089550,43.078780' + ';';
    let optimizedStops = stops.filter((element) => {
      return (element.students.length >= 1)
    });
    let betterCall = RouteHandler.getURL(optimizedStops);
    var geo = ""

    console.log(betterCall);
    //http://www.mapquestapi.com/directions/v2/optimizedroute?key=ia7mvG9M8imVlf9Czviz12ADllK8AniE&json={'locations':['3305+Lilly+Rd+Brookfield+W+53005','13500+W+North+Ave+Brookfield+WI+53005','San+Fernando+Dr+Underwood+River+Pkwy+Elm+Grove+WI+53122','Underwood+River+Pkwy+Hollyhock+Lane+Elm+Grove+WI+53122','Bobby+Ln+Tosca+Ct+Elm+Grove+WI+53122','Dunwoody+Dr+Bobby+Ln+Elm+Grove+WI+53122','Lee+Ct+Hollyhock+Ln+Elm+Grove+WI+53122','Lee+Ct+Arrowhead+Ct+Elm+Grove+WI+53122','Lindhurst+Dr+Legion+Dr+Elm+Grove+WI+53122','Lindhurst+Dr+Elmhurst+Pkwy+Elm+Grove+WI+53122','Juneau+Blvd+Church+St+Elm+Grove+WI+53122','Juneau+Blvd+Elm+Grove+St+Elm+Grove+WI+53122','Juneau+Blvd+Elm+Grove+Rd+Elm+Grove+WI+53122','Woodlawn+Cir+Hillside+Rd+Elm+Grove+WI+53122','Juneau+Blvd+Orchard+Ln+Elm+Grove+WI+53122','1400+Greenway+Terrace+Elm+Grove+WI+53122','1500+Greenway+Terrace+Elm+Grove+WI+53122','Hillside+Rd+Sunset+DrElm+Grove+WI+53122','2400+Pilgrim+Square+Dr+Brookfield+WI+53005'}]

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
      .then(results => getOptimizedStateArray(results))
      .then(url => {geo = url})
      .catch((error) => {
        console.error('Error:', error);
      });
      console.log(optimizedStops);
      return optimizedStops;
    }



    function getOptimizedStateArray(results){
      geo = RouteHandler.getMapBoxURL(results.waypoints)
    }

    getLatitudeLongitude(stops.filter((element, index) => {
      return (element.students.length >= 1)
    }), stops[stops.length-1])
    .then((value) => {
      getOptimizedBusRoute(value, stops[stops.length-1]);
    }).then((value) => {
      console.log(value)
    })

    return geo
  
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
    console.log(this.state.stops);
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
      <Stack.Navigator initialRouteName="Map" headerMode={'none'}>
        <Stack.Screen style= {styles.app} name="Main">
          {props => <MainScreen {...props} clicked={() => {this.clicked(this.state.stops)}} updateStops={this.updateStops} StudentDisplayTapped={this.StudentDisplayTapped} getCheckInText={this.getCheckInText} propstate={this.state} routeHandler={RouteHandler}/>}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={Map} />
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