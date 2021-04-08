import pick from 'lodash/pick'
import haversine from 'haversine'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

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
          {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000}
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { routeCoordinates, distanceTravelled } = this.state
            const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
            const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      
        this.setState({
            routeCoordinates: routeCoordinates.concat(positionLatLngs),
            distanceTravelled: (distanceTravelled + this.calcDistance(newLatLngs)) * 0.621371,
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

    render() {
        return(
            <>    
                <View style={styles.container}>
                    <View style={styles.bottomBarGroup}>
                        <Text style={styles.bottomBarContent}> Distance Traveled : {parseFloat(this.state.distanceTravelled).toFixed(2)} mi</Text>
                    </View>
                </View>
            </>
        )
    }
      
}
const styles = StyleSheet.create({
    container: {
        marginLeft : ((20/912) * Dimensions.get('window').height),
        paddingLeft : ((20/912) * Dimensions.get('window').height),
        alignItems : 'flex-start',
        flexDirection : 'column',
        alignContent: 'center', 
        justifyContent: 'flex-start'
    },
    bottomBarContent: {
        fontSize: ((28 / 912) * Dimensions.get('window').height) 
    }
})