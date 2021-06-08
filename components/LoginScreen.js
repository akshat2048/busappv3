//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Button, Alert, Image, Dimensions, TouchableOpacity } from 'react-native'

import StopsList from './resources/apiusage/DefaultStops'

export default class LoginScreen extends Component {

    state = {
        username: "",
        password: ""
    }

    constructor(props) {
        super(props)

        this._onClick = this._onClick.bind(this);
        this._onChangeText = this._onChangeText.bind(this)
    }

    _onChangeText(text) {
        this.setState({username : text}, () => {
            //Callback
        })
    }

    _onClick() {
        //CHeck with APICommunicator to see if the route id and password are valid
        //APICommunicator should set DefaultStops & DefaultStudents
        if (this.state.username == 1) {
            StopsList.StopsList = StopsList.StopsList1
        } else if (this.state.username == 0) {
            StopsList.StopsList = StopsList.StopsList0
        } else {
            StopsList.StopsList = StopsList.StopsList0
        }
        this.props.resetStops()
        this.props.navigation.navigate("Main")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginPage}>
                    <Image source={'https://i.imgur.com/N2zw7lY.png'} style={styles.image}/>
                    <TextInput style={styles.usernameInput} placeholder="Driver ID" onChangeText={text => this._onChangeText(text)}/>
                    <TouchableOpacity style={styles.loginbutton} onPress={this._onClick}> 
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginPage: {
        flexDirection: 'column',
        height: 0.6 * Dimensions.get('window').height,
        width: 0.5 * Dimensions.get('window').height,
        backgroundColor: '#FDF5E2',
        alignItems: 'center',
        borderRadius: ((25/667) * Dimensions.get('window').height),
        borderWidth: 1,
        borderColor: 'black'
    },
    image: {
        height: ((160/667) * Dimensions.get('window').height),
        width: 0.4 * Dimensions.get('window').height,
        marginTop: ((24/667) * Dimensions.get('window').height),
        marginBottom: ((12/667) * Dimensions.get('window').height)
    },
    loginText: {
        fontSize: ((36/667) * Dimensions.get('window').height),
        marginTop: ((12/667) * Dimensions.get('window').height),
        fontWeight: 'bold',
        fontFamily: 'Chalkduster',
    },
    usernameInput: {
        height: ((63/667) * Dimensions.get('window').height),
        backgroundColor: 'white',
        width: 0.4 * Dimensions.get('window').height,
        marginTop: ((12/667) * Dimensions.get('window').height),
        marginBottom: ((6/667) * Dimensions.get('window').height),
        borderRadius: (0.5) * ((63/667) * Dimensions.get('window').height),
        padding: ((12/667) * Dimensions.get('window').height),
        borderWidth: 1,
        borderColor: 'black',
        fontFamily: 'Chalkduster',
    },
    loginbutton: {
        height: ((63/667) * Dimensions.get('window').height),
        backgroundColor: '#66A4D9',
        width: 0.4 * Dimensions.get('window').height,
        marginTop: ((24/667) * Dimensions.get('window').height),
        marginBottom: ((12/667) * Dimensions.get('window').height),
        borderRadius: (0.5) * ((63/667) * Dimensions.get('window').height),
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: ((18/667) * Dimensions.get('window').height),
        color: '#FFFFFF',
        fontFamily: 'Chalkduster',
    }
})