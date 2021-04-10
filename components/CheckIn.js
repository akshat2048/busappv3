import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

export default class CheckIn extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <View style={styles.yellowRectangle}>
            <Text style={styles.checkIn1}>Check In</Text>
            <Text style={styles.checkIn2}>{this.props.checkInText}</Text>
            <Text style={styles.checkIn3}>Students Checked In</Text>
        </View>
      )
    }
  }
  
const styles = StyleSheet.create({
  yellowRectangle: {
      backgroundColor : '#ffd800',
      marginLeft : ((12/912) * Dimensions.get('window').height),
      marginTop : ((12/912) * Dimensions.get('window').height),
      padding : ((12/912) * Dimensions.get('window').height),
      borderRadius : ((25/912) * Dimensions.get('window').height),
      alignContent : 'center',
      height: ((216/912) * Dimensions.get('window').height),
      borderWidth : 1,
        borderColor : '#000000',
  },
  checkIn1: {
      fontSize : ((60/912) * Dimensions.get('window').height),
      fontFamily : 'System',
      textAlign : 'center',
      fontWeight : 'bold',
      color : '#ffffff',
      fontFamily: 'Chalkduster',
  },
  checkIn2 : {
      fontSize : ((60/912) * Dimensions.get('window').height),
      fontFamily : 'System',
      textAlign : 'center',
      fontWeight : 'bold',
      color : '#ffffff',
      fontFamily: 'Chalkduster',
  },
  checkIn3 : {
      fontSize : ((34/912) * Dimensions.get('window').height),
      fontFamily : 'System',
      textAlign : 'center',
      fontWeight : 'bold',
      color : '#ffffff',
      fontFamily: 'Chalkduster',
  }
  })