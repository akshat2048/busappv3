import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Dimensions } from 'react-native'

export default class RouteButton extends Component {

  constructor(props) {
    console.log("Inside RouteButtonJS Constructor");

    super(props);

    this.openLink = this.openLink.bind(this);

    // this.state.stops = this.props.stops

    // let APICall = 'https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550';
    // let optimizedStops = this.state.stops;

    // async function getLatitudeLongitude(stops){
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
    //   APICall += '&matchSideOfStreet=always&improveFor=distance&mode=fastest;truck;traffic:disabled';
    //   return stops;
    // }


    // function getLatitudeLongitudeHelper(stops, data, counter) {
    //     let address = stops[counter].name.replace(/\s/g, '');
    //     address = address.replace(/,/g, '');
    //     address = address.replace(/&/g, '');  
    //     APICall += '&destination' + (counter + 1) + '=' + address + ';' + data.features[0].geometry.coordinates[1] + ',' + data.features[0].geometry.coordinates[0];
    //     optimizedStops[counter].latitude = data.features[0].geometry.coordinates[1];
    //     optimizedStops[counter].longitude = data.features[0].geometry.coordinates[0];
    // }
    
    // function getOptimizedBusRoute(stops){
    //   console.log(APICall);
    //   console.log(optimizedStops);
    //   fetch(APICall)
    //   .then(response => response.json())
    //   .then(results => getOptimizedStateArray(results))
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    //   return optimizedStops;
    // }

    // function getOptimizedStateArray(results){
    //   console.log(optimizedStops);
    //   console.log(results.results[0].waypoints[0].lat);
    //   for(let i = 0; i < optimizedStops.length; i++){
    //     for(let x = 0; x < optimizedStops.length; x++){
    //       let resultsLat = results.results[0].waypoints[i].lat;
    //       let ogLat = optimizedStops[x].latitude; 
    //       if(resultsLat === ogLat){
    //         optimizedStops[x].stopNum = ((results.results[0].waypoints[i].sequence) + 1);
    //       }
    //     }
    //   }
    //   console.log(optimizedStops);
    // }

    // getLatitudeLongitude(this.state.stops)
    // .then((value) => getOptimizedBusRoute(value));
    // this.opStops = optimizedStops
  }

  openLink() {
    // console.log(this.props)
    // var url = this.props.routeHandler.getURL(this.props);
    this.props._onClick();
  }

  

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.openLink}>
                <Text style={styles.routeText}>Route</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#01735C',
        marginLeft : ((12/912) * Dimensions.get('window').height),
        marginTop : ((12/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignItems : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        flexDirection : 'column',
        height: ((216/912) * Dimensions.get('window').height),
        alignContent: 'center', 
        justifyContent: 'center'
    },
    routeText: {
        fontSize :  ((60/912) * Dimensions.get('window').height),
        fontFamily : 'System',
        fontWeight : 'bold',
        color : '#ffffff',
        padding: ((12/912) * Dimensions.get('window').height),
        alignContent: 'center',
        marginLeft : ((12/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        textAlign: 'center',
        // backgroundColor: ''
    },
})