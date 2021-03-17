//PACKAGES IMPORT
//sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg
//^MAP API KEY

import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

import StopsList from './apiusage/DefaultStops'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state.stops = StopsList.StopsList

        function getMapsAPICall(stops){
            let fetchMethod = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/';
            for(let i = 0; i < stops.length; i++){
              fetchMethod += stops[i].latitude + ',';
              if(i === stops.length - 1){
                fetchMethod += stops[i].longitude;
                break;
              }
              fetchMethod += stops[i].longitude + ';';
            }
            fetchMethod += '?access_token=sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg';
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