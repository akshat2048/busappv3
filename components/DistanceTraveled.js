import pick from 'lodash/pick'
import haversine from 'haversine'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
//install npm lodash.pick
//install npm haversine

export default class DistanceTraveled extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {}
        }
    }
    componentDidMount() {
        
        
        navigator.geolocation.getCurrentPosition(
          (position) => {},
          (error) => alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { routeCoordinates, distanceTravelled } = this.state
            const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
            const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      
        this.setState({
            routeCoordinates: routeCoordinates.concat(positionLatLngs),
            distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
            prevLatLng: newLatLngs
        })
    });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    calcDistance(newLatLng) {
        const { prevLatLng } = this.state
        return (haversine(prevLatLng, newLatLng) || 0)
    }
      
}
