import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Dimensions } from 'react-native'

export default class RouteButton extends Component {

  constructor(props) {
    super(props);
  }

  

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {this.props._onClick()}}>
                <Text style={styles.routeText}>Route  {'\u2794'}</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#66A4D9',
        marginLeft : ((320/912) * Dimensions.get('window').height),
        marginTop : ((11/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignItems : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        flexDirection : 'column',
        marginBottom : ((22/912) * Dimensions.get('window').height),
        width : ((250/912) * Dimensions.get('window').height),
        height : ((60/912) * Dimensions.get('window').height),
        alignContent: 'center', 
        justifyContent: 'center'
    },
    routeText: {
        fontSize :  ((40/912) * Dimensions.get('window').height),
        fontFamily : 'System',
        fontWeight : 'bold',
        color : '#ffffff',
        alignContent: 'center',
        marginLeft : ((6/912) * Dimensions.get('window').height),
        marginRight: ((6/912) * Dimensions.get('window').height),
        textAlign: 'center',
    },
})
  
