//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Linking, Platform } from 'react-native'
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
          firstName: 'Jack',
          lastName: 'Jen',
          stop: 'Westlake Drive',
          stopnum: 18,
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
 best(sameer)
    let APICall = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-88.089550,43.078780' + ';';
    let optimizedStops = stops.filter(element => (element.students.length >= 1));
    let betterCall = RouteHandler.getURL(optimizedStops);
    console.log(betterCall);
    //http://www.mapquestapi.com/directions/v2/optimizedroute?key=ia7mvG9M8imVlf9Czviz12ADllK8AniE&json={'locations':['3305+Lilly+Rd+Brookfield+W+53005','13500+W+North+Ave+Brookfield+WI+53005','San+Fernando+Dr+Underwood+River+Pkwy+Elm+Grove+WI+53122','Underwood+River+Pkwy+Hollyhock+Lane+Elm+Grove+WI+53122','Bobby+Ln+Tosca+Ct+Elm+Grove+WI+53122','Dunwoody+Dr+Bobby+Ln+Elm+Grove+WI+53122','Lee+Ct+Hollyhock+Ln+Elm+Grove+WI+53122','Lee+Ct+Arrowhead+Ct+Elm+Grove+WI+53122','Lindhurst+Dr+Legion+Dr+Elm+Grove+WI+53122','Lindhurst+Dr+Elmhurst+Pkwy+Elm+Grove+WI+53122','Juneau+Blvd+Church+St+Elm+Grove+WI+53122','Juneau+Blvd+Elm+Grove+St+Elm+Grove+WI+53122','Juneau+Blvd+Elm+Grove+Rd+Elm+Grove+WI+53122','Woodlawn+Cir+Hillside+Rd+Elm+Grove+WI+53122','Juneau+Blvd+Orchard+Ln+Elm+Grove+WI+53122','1400+Greenway+Terrace+Elm+Grove+WI+53122','1500+Greenway+Terrace+Elm+Grove+WI+53122','Hillside+Rd+Sunset+DrElm+Grove+WI+53122','2400+Pilgrim+Square+Dr+Brookfield+WI+53005'}]

    async function getLatitudeLongitude(stops){
      for(let i = 0; i < stops.length; i++){
        
        let address = stops[i].name;
        await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg')
        .then(response => response.json())
        .then(data => getLatitudeLongitudeHelper(stops, data, i))
        .catch((error) => {
          console.error('Error:', error);
        });
        //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
      }
      APICall += 'approaches=';
      for(let i = 0; i < (optimizedStops.length); i++){
        APICall += 'curb;'
      }
      APICall += 'curb&roundtrip=false&source=first&destination=last&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
      console.log(APICall);
      optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
      return stops;
    }

    function getLatitudeLongitudeHelper(stops, data, counter) {
        optimizedStops[counter].latitude = data.features[0].geometry.coordinates[1];
        optimizedStops[counter].longitude = data.features[0].geometry.coordinates[0];
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
      .catch((error) => {
        console.error('Error:', error);
      });
      console.log(optimizedStops);
      return optimizedStops;
    }



    function getOptimizedStateArray(results){
      console.log(optimizedStops);
      console.log(results.waypoints[0].name);
      for(let i = 0; i < results.waypoints.length; i++){
        for(let x = 0; x < optimizedStops.length; x++){
          console.log('best');
        }
      }
      

      var url = RouteHandler.getHEREMapsURL(optimizedStops);

    var url = RouteHandler.getHEREMapsURL(stops.filter((element) => {
      if ((element.students.length >= 1) || (element.stopNum == stops.length)) {
        return true;
      } else {
        return false;
      }
    }));
      //var url = RouteHandler.getURL(optimizedStops);
  
      if (Platform.OS == 'web') {
        window.open(url, '_blank');
        return;
      } else {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Cannot open URL");
            //pop up error message
          }
        })
      }

    // let APICall = 'https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550';
    // let optimizedStops = stops.filter(element => (element.students.length >= 1));


    // // if (optimizedStops.length == stops.length) {
    // //   //optimizedStops.push(finalStop);
    // //   var url = RouteHandler.getHEREMapsURL(optimizedStops);
  
    // //   if (Platform.OS == 'web') {
    // //     window.open(url, '_blank');
    // //     return;
    // //   } else {
    // //     Linking.canOpenURL(url).then((supported) => {
    // //       if (supported) {
    // //         Linking.openURL(url);
    // //       } else {
    // //         console.log("Cannot open URL");
    // //         //pop up error message
    // //       }
    // //     })
    // //   }

    // //   return;
    // // }


    // async function getLatitudeLongitude(stops, finalStop){
    //   for(let i = 0; i < stops.length; i++){
        
    //     let address = stops[i].name;
    //     await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg')
    //     .then(response => response.json())
    //     .then(data => getLatitudeLongitudeHelper(stops, data, i))
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    //     //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
    //   }

    //   let address = finalStop.name;
    //   await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg')
    //   .then(response => response.json())
    //   .then(data => {
    //     //finalStop
    //     let address = finalStop.name.replace(/\s/g, '');
    //     address = address.replace(/,/g, '');
    //     address = address.replace(/&/g, '');  
    //     APICall += '&end' + '=' + address + ';' + data.features[0].geometry.coordinates[1] + ',' + data.features[0].geometry.coordinates[0];
    //     finalStop.latitude = data.features[0].geometry.coordinates[1];
    //     finalStop.longitude = data.features[0].geometry.coordinates[0];
    //     optimizedStops.push(finalStop);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    //   //Lat., long.43.06131, -88.105988
    //   APICall += '&trailerCount=2&matchSideOfStreet=onlyIfDivided&improveFor=distance&mode=fastest;truck;traffic:disabled';
    //   return stops
    // }

    // function getLatitudeLongitudeHelper(stops, data, counter) {
    //     let address = stops[counter].name.replace(/\s/g, '');
    //     address = address.replace(/,/g, '');
    //     address = address.replace(/&/g, '');  
    //     APICall += '&destination' + (counter + 1) + '=' + address + ';' + data.features[0].geometry.coordinates[1] + ',' + data.features[0].geometry.coordinates[0];
    //     optimizedStops[counter].latitude = data.features[0].geometry.coordinates[1];
    //     optimizedStops[counter].longitude = data.features[0].geometry.coordinates[0];
    // }
    
    // function getOptimizedBusRoute(stops, finalStop){
    //   console.log(APICall);
    //   console.log(optimizedStops);
    //   fetch(APICall)
    //   .then(response => response.json())
    //   .then(results => getOptimizedStateArray(results, finalStop))
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    //   console.log(optimizedStops);
    //   return optimizedStops;
    // }

    // function getOptimizedStateArray(results, finalStop){
    //   // console.log(optimizedStops);
    //   // console.log(results);
    //   // console.log(results.results[0].waypoints[0].lat);
    //   // for(let i = 0; i < optimizedStops.length; i++){
    //   //   for(let x = 0; x < optimizedStops.length; x++){
    //   //     let resultsLat = results.results[0].waypoints[i].lat;
    //   //     let ogLat = optimizedStops[x].latitude; 
    //   //     if(resultsLat === ogLat){
    //   //       optimizedStops[x].stopNum = ((results.results[0].waypoints[i].sequence) + 1);
    //   //     }
    //   //   }
    //   // }

    //   // console.log(optimizedStops);
    //   // optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
    //   // console.log(optimizedStops);

    //   // optimizedStops.splice(0, optimizedStops.length);
    //   // for(var i = 0; i < results.results[0].waypoints.length; i++) {

    //   //   let toPush = {
    //   //     name: "",
    //   //     latitude: 0,
    //   //     longitude: 0,
    //   //   }

    //   //   toPush.name = results.results[0].waypoints[i].id  
    //   //   toPush.latitude = results.results[0].waypoints[i].latitude
    //   //   toPush.longitude = results.results[0].waypoints[i].longitude

    //   //   optimizedStops.push(toPush);
    //   // }

    //   console.log(results);
    //   //optimizedStops.push(finalStop);
    //   var url = RouteHandler.getHEREMapsURL(optimizedStops);
    //   //var url = RouteHandler.getURL(optimizedStops);
  
    //   if (Platform.OS == 'web') {
    //     window.open(url, '_blank');
    //     return;
    //   } else {
    //     Linking.canOpenURL(url).then((supported) => {
    //       if (supported) {
    //         Linking.openURL(url);
    //       } else {
    //         console.log("Cannot open URL");
    //         //pop up error message
    //       }
    //     })
    //   }
    // }


    // //https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550&destination1=UnderwoodRiverPkwyHollyhockLaneElmGroveWI53122;43.054698,-88.081022&destination2=LeeCtHollyhockLnElmGroveWI53122;43.059648,-88.080151&destination3=LindhurstDrElmhurstPkwyElmGroveWI53122;43.0501433,-88.0789511&destination4=JuneauBlvdElmGroveRdElmGroveWI53122;43.04,-88.08&destination5=1400GreenwayTerraceElmGroveWI53122;43.048425,-88.093264&destination6=2400PilgrimSquareDrBrookfieldWI53005;43.062413,-88.105253&matchSideOfStreet=always&improveFor=distance&mode=fastest;truck;traffic:disabled

    // getLatitudeLongitude(stops.filter(element => (element.students.length >= 1)), stops[stops.length-1])
    // .then((value) => {
    //   getOptimizedBusRoute(value, stops[stops.length-1]);
    // }).then((value) => {
    //   console.log(value)
    // })
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
      <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
        <Stack.Screen style= {styles.app} name="Main">
          {props => <MainScreen {...props} clicked={() => {this.clicked(this.state.stops)}} updateStops={this.updateStops} StudentDisplayTapped={this.StudentDisplayTapped} getCheckInText={this.getCheckInText} propstate={this.state} routeHandler={RouteHandler}/>}
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
  }
});