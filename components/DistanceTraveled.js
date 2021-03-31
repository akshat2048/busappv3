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
                
                <View style={styles.container}>
                    <View style={styles.bottomBarGroup}>
                    <Text>Distance</Text>
                    <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} mi</Text>
                    </View>
                </View>
            </>
        )
    }
      
}
const styles = StyleSheet.create({
    container: {
        backgroundColor : '#66A4D9',
        marginLeft : ((320/912) * Dimensions.get('window').height),
        //marginTop : ((11/912) * Dimensions.get('window').height),
        //marginRight: ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignItems : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        flexDirection : 'column',
        //marginBottom : ((22/912) * Dimensions.get('window').height),
        //paddingLeft : ((200/912) * Dimensions.get('window').height),
        width : ((250/912) * Dimensions.get('window').height),
        height : ((60/912) * Dimensions.get('window').height),
        //height: ((108/912) * Dimensions.get('window').height),
        alignContent: 'center', 
        justifyContent: 'center'
    },
    leftPanel: {
      flexDirection: 'column',
      width: ((Dimensions.get('window').width/2)),
      height: Dimensions.get('window').height
    },
    
})
