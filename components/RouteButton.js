import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Dimensions } from 'react-native'

export default class RouteButton extends Component {
  constructor(props) {
    super(props);

    this.openLink = this.openLink.bind(this);
  }

  openLink() {
    console.log(this.props)
    var url = this.props.routeHandler.getURL(this.props);
    if (Platform.OS == 'web') {
        window.open(url, '_blank');
    }
  }

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.openLink}>
                <Text style={styles.routeText}>Route</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#01735C',
        marginLeft : ((12/912) * Dimensions.get('window').height),
        marginTop : ((12/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignItems : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        flexDirection : 'column',
        height: ((216/912) * Dimensions.get('window').height),
        alignContent: 'center', 
        justifyContent: 'center'
    },
    routeText: {
        fontSize :  ((60/912) * Dimensions.get('window').height),
        fontFamily : 'System',
        fontWeight : 'bold',
        color : '#ffffff',
        padding: ((12/912) * Dimensions.get('window').height),
        alignContent: 'center',
        marginLeft : ((12/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        textAlign: 'center',
        backgroundColor: ''
    },
})