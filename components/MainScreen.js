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

  // _onClick() {
  //   propSetCoords = this.props.setCoordinates
  //   propNavigation = this.props.navigation
  //   function clicked(stops) {
  //     let APICall = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-88.089550,43.078780' + ';';
  //     let optimizedStops = stops.filter((element) => {
  //       return (element.students.length >= 1)
  //     });
  
  //     async function getLatitudeLongitude(stops){
  //       for(let i = 0; i < stops.length; i++){
          
  //         let address = stops[i].name;
  //         address = address.replace(/ /g, '+');
  //         address = address.replace(/&/g, '');
  //         console.log(address);
  //         await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBF6Ord-pAW1bdfydjAzOZYkU-PnqbaCKQ')
  //         .then(response => response.json())
  //         .then(data => getLatitudeLongitudeHelper(stops, data, i))
  //         .catch((error) => {
  //           console.error('Error:', error);
  //         });
  //         //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
  //       }
  
  //       APICall += '&bearings=';
  //       for(let i = 0; i < stops.length; i++){
  //         APICall += '45,90;'
  //       }
  //       APICall += '&radiuses=';
  //       for(let i = 0; i < stops.length; i++){
  //         APICall += '100;'
  //       }
  
  //       APICall += '&roundtrip=false&source=first&destination=last&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
  //       console.log(APICall);
  //       optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
  //       return stops;
  //     }
  
  //     function getLatitudeLongitudeHelper(stops, data, counter) {
  //         console.log(data.results[0].geometry.location.lat);
  //         console.log(data.results[0].geometry.location.lng)
  //         optimizedStops[counter].latitude = data.results[0].geometry.location.lat;
  //         optimizedStops[counter].longitude = data.results[0].geometry.location.lng;
  //         if(counter === (optimizedStops.length) - 1){
  //           APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + '?';
  //         }
  //         else {
  //           APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + ';';
  //         }
  //     }
      
  //     function getOptimizedBusRoute(stops){
  //       console.log(APICall);
  //       console.log(optimizedStops);
  //       fetch(APICall)
  //       .then(response => response.json())
  //       .then(results => {
  //         getMapBoxURL(results.waypoints).then((Coords) => {
  //         })
  //       })
  //       // .then(value => {
  //       //   console.log(value)
  //       //   geom = value
  //       // })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  //       console.log(optimizedStops);
  //     }
  
  //     async function getMapBoxURL(waypoints) {
  //       //https://docs.mapbox.com/api/navigation/directions/
  //       let MapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/-88.089550,43.078780' + ';';
  //       for(let i = 0; i < waypoints.length; i++){
  //           if(i == waypoints.length - 1){
  //               MapboxAPI += waypoints[i].location[0] + ',' + waypoints[i].location[1] + '?';
  //               break;
  //           }
  //           MapboxAPI += waypoints[i].location[0] + ',' + waypoints[i].location[1] + ';';
  //       }
  //       MapboxAPI += '&geometries=geojson&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
  //       //Polyline
  //       //MapboxAPI += '&geometries=polyline6&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
  //       console.log(MapboxAPI);
  //       var geome = {}
  //       var geo = await fetch(MapboxAPI)
  //       .then(response => response.json())
  //       .then(results => {
  //         //GeoJSON decoding
  //         console.log(results.routes[0].geometry.coordinates)
  //         //setCoords(results.routes[0].geometry.coordinates);
  //         geome = results.routes[0].geometry.coordinates

  //         //Polyline decoding
  //         //geome = polyline.decode(results.routes[0].geometry)

  //       })
  //       .catch((error) => {
  //           console.error('Error:', error);
  //       }).finally(() => {
  //           console.log("setting coords")
  //           propSetCoords(geome)
  //           propNavigation.navigate("Map")
  //       })
  //       return geo;
  //     }
  
  //     getLatitudeLongitude(stops.filter((element, index) => {
  //       return (element.students.length >= 1)
  //     }), stops[stops.length-1])
  //     .then((value) => {
  //       getOptimizedBusRoute(value, this);
  //     })
  //   }
  //   clicked(this.state.stops) 
  // }

  // _onClick() {
  //         propSetDistanceToBeTravelled = this.props.setDistanceToBeTravelled
  //         propSetTime = this.props.setTime
  //         propSetCoords = this.props.setCoordinates
  //        propNavigation = this.props.navigation
  //        propSetReOrderedStops = this.props.setReOrderedStops
  //        var reorderedStops = []
  //        var geome = []
  //        function clicked(stops) {
  //          let APICall = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-88.089550,43.078780' + ';';
  //          let optimizedStops = stops.filter((element) => {
  //            return (element.students.length >= 1)
  //          });

  //          async function getLatitudeLongitude(stops){
  //            for(let i = 0; i < stops.length; i++){

  //              let address = stops[i].name;
  //              address = address.replace(/ /g, '+');
  //              address = address.replace(/&/g, '');
  //              console.log(address);
  //              await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBF6Ord-pAW1bdfydjAzOZYkU-PnqbaCKQ')
  //              .then(response => response.json())
  //              .then(data => getLatitudeLongitudeHelper(stops, data, i))
  //              .catch((error) => {
  //                console.error('Error:', error);
  //              });
  //              //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
  //            }

  //           //  APICall += '&bearings=';
  //           //  for(let i = 0; i < stops.length; i++){
  //           //    APICall += '45,180;'
  //           //  }

  //           //  APICall += '&radiuses=';
  //           //  for(let i = 0; i < stops.length; i++){
  //           //    APICall += '100;'
  //           //  }

  //            APICall += '&roundtrip=false&source=first&destination=last&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
  //            console.log(APICall);
  //            optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
  //            return stops;
  //          }

  //          function getLatitudeLongitudeHelper(stops, data, counter) {
  //              console.log(data.results[0].geometry.location.lat);
  //              console.log(data.results[0].geometry.location.lng)
  //              optimizedStops[counter].latitude = data.results[0].geometry.location.lat;
  //              optimizedStops[counter].longitude = data.results[0].geometry.location.lng;
  //              if(counter === (optimizedStops.length) - 1){
  //                APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + '?';
  //              }
  //              else {
  //                APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + ';';
  //              }
  //          }

  //          function getOptimizedBusRoute(stops){
  //            console.log(APICall);
  //            console.log(optimizedStops);
  //            fetch(APICall)
  //            .then(response => response.json())
  //            .then(results => {
  //              propSetDistanceToBeTravelled(parseFloat(results.trips[0].distance/1609).toFixed(3))
  //              getMapBoxURL(results.waypoints).then((Coords) => {
  //              })
  //            })
  //            .catch((error) => {
  //              console.error('Error:', error);
  //            });
  //            console.log(optimizedStops);
  //          }

  //          async function getMapBoxURL(waypoints) {
  //            //https://docs.mapbox.com/api/navigation/directions/
  //            let MapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/-88.089550,43.078780' + ';';

  //         let newWaypoints = waypoints
  //         newWaypoints = newWaypoints.sort((a, b) => (a.waypoint_index - b.waypoint_index))
  //         console.log(newWaypoints)
  //         newWaypoints.forEach((element, i) => {

  //           if(i == newWaypoints.length - 1){
  //             MapboxAPI += newWaypoints[i].location[0] + ',' + newWaypoints[i].location[1] + '?';
  //           } else {
  //             MapboxAPI += newWaypoints[i].location[0] + ',' + newWaypoints[i].location[1] + ';';
  //           }
  //           console.log(newWaypoints[i].waypoint_index);

  //           var stopObject = {
  //             name: '',
  //             stopNum: 0,
  //             latitude: 0,
  //             longitude: 0
  //           }
  //           stopObject.latitude = element.location[1]
  //           stopObject.longitude = element.location[0]
  //           stopObject.name = element.name
  //           stopObject.stopNum = element.waypoint_index

  //           reorderedStops.push(stopObject)
  //         });

  //           //   MapboxAPI += '&radiuses=';
  //           //  for(let i = 0; i < waypoints.length; i++){
  //           //    MapboxAPI += '100;'
  //           //  }
  //            MapboxAPI += '&steps=true&geometries=geojson&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
  //            console.log(MapboxAPI);
  //            var geo = await fetch(MapboxAPI)
  //            .then(response => response.json())
  //            .then(results => {
  //              console.log(results.routes[0].geometry.coordinates)
  //              results.routes[0].legs.forEach(element => {
  //               element.steps.forEach(innerElement => {
  //                 innerElement.geometry.coordinates.forEach(innerInnerElement => {
  //                   geome.push(innerInnerElement)
  //                 });
  //               });
  //             });
  //            })
  //            .catch((error) => {
  //                console.error('Error:', error);
  //            }).finally(() => {
  //                console.log("setting coords")
  //                propSetCoords(geome)
  //                propNavigation.navigate("Map")
  //                propSetReOrderedStops(reorderedStops)
  //            })
  //            return geo;
  //          }

  //          getLatitudeLongitude(stops.filter((element, index) => {
  //            return (element.students.length >= 1)
  //          }), stops[stops.length-1])
  //          .then((value) => {
  //            getOptimizedBusRoute(value, this);
  //          })
  //        }
  //        clicked(this.state.stops) 
  // }

  _onClick() {
    propSetDistanceToBeTravelled = this.props.setDistanceToBeTravelled
    propSetTime = this.props.setTime
    propSetCoords = this.props.setCoordinates
   propNavigation = this.props.navigation
   propSetReOrderedStops = this.props.setReOrderedStops
   var reorderedStops = []
   var geome = []
   var time = 0
   var dist = 0
   function clicked(stops) {
     let APICall = 'https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550' + ';';
     let optimizedStops = stops.filter((element) => {
       return (element.students.length >= 1)
     });

     async function getLatitudeLongitude(stops){
       for(let i = 0; i < optimizedStops.length; i++){

         let address = optimizedStops[i].name;
         address = address.replace(/ /g, '+');
         address = address.replace(/&/g, '');
         address = address.replace('&', '')
         console.log(address);
         await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBF6Ord-pAW1bdfydjAzOZYkU-PnqbaCKQ')
         .then(response => response.json())
         .then(data => getLatitudeLongitudeHelper(stops, data, i))
         .catch((error) => {
           console.error('Error:', error);
         });
         //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
         //https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550;&destination1=13500WNorthAveBrookfieldWI53005;43.0607516,-88.0808586&destination2=SanFernandoDr&UnderwoodRiverPkwyElmGroveWI53122;43.05491230000001,-88.0840554&destination3=UnderwoodRiverPkwy&HollyhockLaneElmGroveWI53122;43.0547035,-88.0810188&destination4=BobbyLn&ToscaCtElmGroveWI53122;43.0554841,-88.0798379&destination5=DunwoodyDr&BobbyLnElmGroveWI53122;43.0562835,-88.07899019999999&destination6=LeeCt&HollyhockLnElmGroveWI53122;43.059645,-88.0801255&destination7=LeeCt&ArrowheadCtElmGroveWI53122;43.0587422,-88.0773206&destination8=LindhurstDr&LegionDrElmGroveWI53122;43.0523337,-88.0805031&destination9=LindhurstDr&ElmhurstPkwyElmGroveWI53122;43.0501392,-88.0789454&destination10=JuneauBlvd&ChurchStElmGroveWI53122;43.0456097,-88.07745779999999&destination11=JuneauBlvd&ElmGroveStElmGroveWI53122;43.0456393,-88.0788661&destination12=JuneauBlvd&ElmGroveRdElmGroveWI53122;43.0457192,-88.0837354&destination13=WoodlawnCir&HillsideRdElmGroveWI53122;43.0494279,-88.0888844&destination14=JuneauBlvd&OrchardLnElmGroveWI53122;43.0458483,-88.08733629999999&destination15=GreenwayTerrace&WoodlandCircleElmGroveWI53122;43.0492896,-88.094089&destination16=HillsideRd&SunsetDrElmGroveWI53122;43.0523555,-88.0917561&destination17=2400PilgrimSquareDrBrookfieldWI53005;43.0623454,-88.1052425&mode=shortest;truck;traffic;disabled
       }

       for(let i = 0; i < optimizedStops.length-1; i++){
        let address = optimizedStops[i].name.replace(/\s/g, '');
        address = address.replace(/,/g, '');
        address = address.replace(/&/g, '');
         address = address.replace('&', '');
         address = address.replace(/ /g, '');
        APICall += '&destination' + (i + 1) + '=' + address + ';' + optimizedStops[i].latitude + ',' + optimizedStops[i].longitude;
      }
      let address = optimizedStops[optimizedStops.length-1].name.replace(/\s/g, '');
        address = address.replace(/,/g, '');
        address = address.replace(/&/g, '');
         address = address.replace('&', '');
         address = address.replace(/ /g, '');
        APICall += '&end' + '=' + address + ';' + optimizedStops[optimizedStops.length-1].latitude + ',' + optimizedStops[optimizedStops.length-1].longitude;

      //  APICall += '&bearings=';
      //  for(let i = 0; i < stops.length; i++){
      //    APICall += '45,180;'
      //  }

      //  APICall += '&radiuses=';
      //  for(let i = 0; i < stops.length; i++){
      //    APICall += '100;'
      //  }

       APICall += '&avoidTurns=uTurns[;000000000]&avoid[features]=difficultTurns&improveFor=distance&mode=fastest;truck;traffic:disabled'
       console.log(APICall);
       optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
       return stops;
     }

     function getLatitudeLongitudeHelper(stops, data, counter) {
         console.log(data.results[0].geometry.location.lat);
         console.log(data.results[0].geometry.location.lng)
         optimizedStops[counter].latitude = data.results[0].geometry.location.lat;
         optimizedStops[counter].longitude = data.results[0].geometry.location.lng;
        //  if(counter === (optimizedStops.length) - 1){
        //    APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + '?';
        //  }
        //  else {
        //    APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + ';';
        //  }
     }

     function getOptimizedBusRoute(stops){
       console.log(APICall);
       console.log(optimizedStops);
       fetch(APICall)
       .then(response => response.json())
       .then(results => {
         propSetDistanceToBeTravelled()
         getMapBoxURL(results.results[0].waypoints).then((Coords) => {
         })
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
    newWaypoints = newWaypoints.sort((a, b) => (a.sequence - b.sequence))
    console.log(newWaypoints)
    newWaypoints.forEach((element, i) => {

      if(i == newWaypoints.length - 1){
        MapboxAPI += element.lng + ',' + element.lat + '?';
      } else {
        MapboxAPI += element.lng + ',' + element.lat + ';';
      }
      //console.log(waypoints[i].waypoint_index);

      var stopObject = {
        name: '',
        stopNum: 0,
        latitude: 0,
        longitude: 0
      }
      stopObject.latitude = element.lat
      stopObject.longitude = element.lng
      stopObject.name = element.id
      stopObject.stopNum = element.sequence
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
        dist = (results.routes[0].distance/1609).toFixed(3)
        time = (results.routes[0].duration/60).toFixed(2)
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

     getLatitudeLongitude(stops.filter((element, index) => {
       return (element.students.length >= 1)
     }), stops[stops.length-1])
     .then((value) => {
       getOptimizedBusRoute(value, this);
     })
   }
   clicked(this.state.stops) 
  }

  // _onClick() {
  //   propSetDistanceToBeTravelled = this.props.setDistanceToBeTravelled
  //   propSetTime = this.props.setTime
  //   propSetCoords = this.props.setCoordinates
  //  propNavigation = this.props.navigation
  //  propSetReOrderedStops = this.props.setReOrderedStops
  //  var reorderedStops = []
  //  var geome = []
  //  var time = 0
  //  var dist = 0
  //  function clicked(stops) {
  //    let APICall = 'https://fleet.ls.hereapi.com/2/calculateroute.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&waypoint0=BrookfieldEastHighSchool;43.078780,-88.089550' + ';';
  //    let optimizedStops = stops.filter((element) => {
  //      return (element.students.length >= 1)
  //    });

  //    async function getLatitudeLongitude(stops){
  //      for(let i = 0; i < optimizedStops.length; i++){

  //        let address = optimizedStops[i].name;
  //        address = address.replace(/ /g, '+');
  //        address = address.replace(/&/g, '');
  //        address = address.replace('&', '')
  //        console.log(address);
  //        await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBF6Ord-pAW1bdfydjAzOZYkU-PnqbaCKQ')
  //        .then(response => response.json())
  //        .then(data => getLatitudeLongitudeHelper(stops, data, i))
  //        .catch((error) => {
  //          console.error('Error:', error);
  //        });
  //        //define an arrow function that takes in a data parameter and then from there in that function u can implement whatever u want
  //        //https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550;&destination1=13500WNorthAveBrookfieldWI53005;43.0607516,-88.0808586&destination2=SanFernandoDr&UnderwoodRiverPkwyElmGroveWI53122;43.05491230000001,-88.0840554&destination3=UnderwoodRiverPkwy&HollyhockLaneElmGroveWI53122;43.0547035,-88.0810188&destination4=BobbyLn&ToscaCtElmGroveWI53122;43.0554841,-88.0798379&destination5=DunwoodyDr&BobbyLnElmGroveWI53122;43.0562835,-88.07899019999999&destination6=LeeCt&HollyhockLnElmGroveWI53122;43.059645,-88.0801255&destination7=LeeCt&ArrowheadCtElmGroveWI53122;43.0587422,-88.0773206&destination8=LindhurstDr&LegionDrElmGroveWI53122;43.0523337,-88.0805031&destination9=LindhurstDr&ElmhurstPkwyElmGroveWI53122;43.0501392,-88.0789454&destination10=JuneauBlvd&ChurchStElmGroveWI53122;43.0456097,-88.07745779999999&destination11=JuneauBlvd&ElmGroveStElmGroveWI53122;43.0456393,-88.0788661&destination12=JuneauBlvd&ElmGroveRdElmGroveWI53122;43.0457192,-88.0837354&destination13=WoodlawnCir&HillsideRdElmGroveWI53122;43.0494279,-88.0888844&destination14=JuneauBlvd&OrchardLnElmGroveWI53122;43.0458483,-88.08733629999999&destination15=GreenwayTerrace&WoodlandCircleElmGroveWI53122;43.0492896,-88.094089&destination16=HillsideRd&SunsetDrElmGroveWI53122;43.0523555,-88.0917561&destination17=2400PilgrimSquareDrBrookfieldWI53005;43.0623454,-88.1052425&mode=shortest;truck;traffic;disabled
  //      }

  //      for(let i = 1; i < optimizedStops.length-1; i++){
  //       let address = optimizedStops[i].name.replace(/\s/g, '');
  //       address = address.replace(/,/g, '');
  //       address = address.replace(/&/g, '');
  //        address = address.replace('&', '');
  //        address = address.replace(/ /g, '');
  //       APICall += '&waypoint' + (i) + '=' + address + ';' + optimizedStops[i].latitude + ',' + optimizedStops[i].longitude + ';sort';
  //     }
  //     let address = optimizedStops[optimizedStops.length-1].name.replace(/\s/g, '');
  //       address = address.replace(/,/g, '');
  //       address = address.replace(/&/g, '');
  //        address = address.replace('&', '');
  //        address = address.replace(/ /g, '');
  //       APICall += '&waypoint' + optimizedStops.length-1 + address + ';' + optimizedStops[optimizedStops.length-1].latitude + ',' + optimizedStops[optimizedStops.length-1].longitude;

  //     //  APICall += '&bearings=';
  //     //  for(let i = 0; i < stops.length; i++){
  //     //    APICall += '45,180;'
  //     //  }

  //     //  APICall += '&radiuses=';
  //     //  for(let i = 0; i < stops.length; i++){
  //     //    APICall += '100;'
  //     //  }

  //      APICall += '&avoidTurns=uTurns[;000000000]&avoid[features]=difficultTurns&improveFor=distance&mode=fastest;truck;traffic:disabled'
  //      console.log(APICall);
  //      optimizedStops.sort(function(a, b){return a.stopNum - b.stopNum});
  //      return stops;
  //    }

  //    function getLatitudeLongitudeHelper(stops, data, counter) {
  //        console.log(data.results[0].geometry.location.lat);
  //        console.log(data.results[0].geometry.location.lng)
  //        optimizedStops[counter].latitude = data.results[0].geometry.location.lat;
  //        optimizedStops[counter].longitude = data.results[0].geometry.location.lng;
  //       //  if(counter === (optimizedStops.length) - 1){
  //       //    APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + '?';
  //       //  }
  //       //  else {
  //       //    APICall += optimizedStops[counter].longitude + ',' + optimizedStops[counter].latitude + ';';
  //       //  }
  //    }

  //    function getOptimizedBusRoute(stops){
  //      console.log(APICall);
  //      console.log(optimizedStops);
  //      fetch(APICall)
  //      .then(response => response.json())
  //      .then(results => {
  //        propSetDistanceToBeTravelled()
  //        getMapBoxURL(results.results[0].waypoints).then((Coords) => {
  //        })
  //      })
  //      .catch((error) => {
  //        console.error('Error:', error);
  //      });
  //      console.log(optimizedStops);
  //    }

  //    async function getMapBoxURL(waypoints) {
  //      //https://docs.mapbox.com/api/navigation/directions/
  //      let MapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/-88.089550,43.078780' + ';';

  //   let newWaypoints = waypoints
  //   newWaypoints = newWaypoints.sort((a, b) => (a.sequence - b.sequence))
  //   console.log(newWaypoints)
  //   newWaypoints.forEach((element, i) => {

  //     if(i == newWaypoints.length - 1){
  //       MapboxAPI += element.lng + ',' + element.lat + '?';
  //     } else {
  //       MapboxAPI += element.lng + ',' + element.lat + ';';
  //     }
  //     //console.log(waypoints[i].waypoint_index);

  //     var stopObject = {
  //       name: '',
  //       stopNum: 0,
  //       latitude: 0,
  //       longitude: 0
  //     }
  //     stopObject.latitude = element.lat
  //     stopObject.longitude = element.lng
  //     stopObject.name = element.id
  //     stopObject.stopNum = element.sequence
  //     reorderedStops.push(stopObject)
  //   });

  //     //   MapboxAPI += '&radiuses=';
  //     //  for(let i = 0; i < waypoints.length; i++){
  //     //    MapboxAPI += '100;'
  //     //  }
  //      MapboxAPI += '&steps=true&geometries=geojson&access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'
  //      console.log(MapboxAPI);
  //      var geo = await fetch(MapboxAPI)
  //      .then(response => response.json())
  //      .then(results => {
  //        console.log(results.routes[0].geometry.coordinates)
  //        results.routes[0].legs.forEach(element => {
  //         element.steps.forEach(innerElement => {
  //           innerElement.geometry.coordinates.forEach(innerInnerElement => {
  //             geome.push(innerInnerElement)
  //           });
  //         });
  //       });
  //       dist = (results.routes[0].distance/1609).toFixed(3)
  //       time = (results.routes[0].duration/60).toFixed(2)
  //      })
  //      .catch((error) => {
  //          console.error('Error:', error);
  //      }).finally(() => {
  //          console.log("setting coords")
  //          propSetCoords(geome)
  //          propNavigation.navigate("Map")
  //          propSetReOrderedStops(reorderedStops)
  //          propSetTime(time)
  //          propSetDistanceToBeTravelled(dist)
  //      })
  //      return geo;
  //    }

  //    getLatitudeLongitude(stops.filter((element, index) => {
  //      return (element.students.length >= 1)
  //    }), stops[stops.length-1])
  //    .then((value) => {
  //      getOptimizedBusRoute(value, this);
  //    })
  //  }
  //  clicked(this.state.stops) 
  // }
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