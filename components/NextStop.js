import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Text } from 'react-native'

export default class NextStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextStop : 'Brookfield Rd'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapIcon}>
            <ImageBackground source = {require('./resources/pin.png')}  styles = {styles.image}>
            </ImageBackground>
        </View>
        <Text style={styles.name}>Next Stop - {this.state.nextStop}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#ffffff',
        marginLeft : 12,
        marginTop : 12,
        padding : 12,
        borderRadius : 25,
        alignContent : 'center',
        borderWidth : 1,
        borderColor : '#000000',
        flexDirection : 'row'
    },
    mapIcon: {
        borderWidth: 1,
        borderColor: '#448ee4',
        height : 50,
        width: 50,
        marginRight: 12,
        paddingRight: 12,
        borderRadius: 25,
        alignContent: 'center'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    name : {
      fontSize : 40,
      fontFamily : 'System',
      textAlign : 'center',
      fontWeight : 'light',
      color : '#000000'
    }
})