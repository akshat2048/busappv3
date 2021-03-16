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

export default class Map extends Component {
    constructor(props) {

    }

    render() {
        
    }
}
