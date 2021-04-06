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

import mapboxgl from 'mapbox-gl';

import { View, Text, StyleSheet, Dimensions } from 'react-native'

var __html = require('./index.html');
var template = { __html: __html };

const mapboxAT = 'sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg'

mapboxgl.accessToken = mapboxAT;

export default class Map extends Component {
  render() {
    // mapboxgl.accessToken = 'sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg';
    // var map = new mapboxgl.Map({
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-74.5, 40], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    // });
    return (
      <div id='map'>
        <script>console.log("Hello")</script>
      </div>
    )
  }
}


/*
<html>

              <head>
                <meta charset="utf-8">
                  <title>Add a GeoJSON line</title>
                  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet">
                      <script src="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js"></script>
                      <style>
                        body {
                          margin: 0;
            padding: 0;
        }

        #map {
                          position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>

                    <body>
                      <h1>Hello</h1>
                      <div id="map"></div>
                      <script type='text/javascript' src='./ReturnedGeometry.js'></script>
                      <script>
                        import mapboxgl from 'mapbox-gl'
                        mapboxgl.accessToken = 'sk.eyJ1IjoiMjNjaGFubmEiLCJhIjoiY2ttOGYwM2NhMGwydDJ1cWx1Z2JkbDZ2cyJ9.oZ8yOSU7PbsH8QtdbdlrCg';
        var map = new mapboxgl.Map({
                          container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-122.486052, 37.830348],
            zoom: 15
        });

        map.on('load', function () {
                          map.addSource('route', {
                            'type': 'geojson',
                            'data': {
                              'type': 'Feature',
                              'properties': {},
                              'geometry': ReturnedGeometry() //call to the ReturnedGeometry() function in ./ReturnedGeometry.js
                            }
                          });
            map.addLayer({
                          'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                          'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                          'line-color': '#888',
                    'line-width': 8
                }
            });
        });
    </script>

                    </body>

</html>
*/
