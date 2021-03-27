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
        }, () => {console.log("HELLO")})
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
                <View style={styles.navBar}><Text style={styles.navBarText}>Run Rabbit Run</Text></View>
                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarGroup}>
                    <Text style={styles.bottomBarHeader}>DISTANCE</Text>
                    <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} mi</Text>
                    </View>
                </View>
            </>
        )
    }
      
}
const styles = StyleSheet.create({
    app: {
      flex: 1,
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      // marginBottom: ((12/912) * Dimensions.get('window').height)
      marginBottom: 0
    },
    leftPanel: {
      flexDirection: 'column',
      width: ((Dimensions.get('window').width/2)),
      height: Dimensions.get('window').height
    },
    midPanel: {
      flexDirection: 'column',
      width: ((Dimensions.get('window').width/2)) - 12,
      height: Dimensions.get('window').height - 10,
      marginRight: ((12/912) * Dimensions.get('window').height)
    },
    yourStudents: {
      marginLeft: ((12/912) * Dimensions.get('window').height),
      marginBottom: 0,
      marginTop: ((12/912) * Dimensions.get('window').height),
      paddingBottom: ((-3/912) * Dimensions.get('window').height),
    }
})
