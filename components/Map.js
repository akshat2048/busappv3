//PACKAGES IMPORT
//sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg
//^MAP API KEY


/*
  
  //Sameer use this code to help you know what you have to do to set up the thing for artie.
  if (res !== null) {
    const directions = res.entity.routes[0];
    this.setState({ directions: directions });
  }
  
 //Artie model ur code off this render function
 render () {
  const directions = this.state.directions;
  
  if (!directions) {
    return null;
  }
  
  return (
    <MapboxGL.ShapeSource id='mapbox-directions-source' shape={directions.geometry}>
      <MapboxGL.LineLayer
        id='mapbox-directions-line'
        belowLayerID={Places.UnselectedSymbolID}
        style={[styles.directionsLine, this.props.style]} />
    </MapboxGL.ShapeSource>
  );
}
*/

import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

import StopsList from './apiusage/DefaultStops'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state.stops = StopsList.StopsList

        function getMapsAPICall(stops){
          let fetchMethod = 'https://wse.ls.hereapi.com/2/findsequence.json?apiKey=ectn9LzIe40kdFeXfx7-BrRF9u_ZxHxBhaenQkEurFM&start=BrookfieldEastHighSchool;43.078780,-88.089550';
          for(let i = 0; i < stops.length; i++){
            let address = stops[i].name.replace(/\s/g, '');
            address = address.replace(/,/g, '');
            fetchMethod += '&destination' + (i + 1) + '=' + address + ';' + stops[i].latitude + ',' + stops[i].longitude;
          }
          fetchMethod += '&mode=shortest;truck;traffic;disabled';
          console.log(fetchMethod);
          return fetchMethod;
        }
    
        function getOptimizedBusRoute(stops){
          let APICall = getMapsAPICall(stops);
          fetch(APICall)
          .then(response => response.json())
          .catch((error) => {
            console.error('Error:', error);
          });
        }
    
        getOptimizedBusRoute(this.state.stops);
    }

    render() {
        
    }
}
