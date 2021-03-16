//PACKAGES IMPORT
import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Button, Alert, Image, Dimensions, TouchableOpacity } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render } from '@testing-library/react'


export default class LoginScreen extends Component {

    state = {
        username: "",
        password: ""
    }

    constructor(props) {
        super(props)

        this._onClick = this._onClick.bind(this);
    }


    _onClick() {
        //CHeck with APICommunicator to see if the route id and password are valid
        //APICommunicator should set DefaultStops & DefaultStudents
        this.props.navigation.navigate("Main")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginPage}>
                    <Image source={'https://i.imgur.com/N2zw7lY.png'} style={styles.image}/>
                    <Text style={styles.loginText}>Log In</Text>
                    <TextInput style={styles.usernameInput} placeholder="Email"/>
                    <TextInput style={styles.passwordInput} placeholder="Password"/>
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
        height: 0.75 * Dimensions.get('window').height,
        width: 0.5 * Dimensions.get('window').height,
        backgroundColor: '#C8C4B7',
        alignItems: 'center',
        borderRadius: ((25/667) * Dimensions.get('window').height),
        borderWidth: 1,
        borderColor: 'black'
    },
    image: {
        height: ((160/667) * Dimensions.get('window').height),
        width: 0.4 * Dimensions.get('window').height,
        //backgroundColor: '#F5F4F2',
        marginTop: ((24/667) * Dimensions.get('window').height)
    },
    loginText: {
        fontSize: ((36/667) * Dimensions.get('window').height),
        marginTop: ((12/667) * Dimensions.get('window').height),
        fontWeight: 'bold'
    },
    usernameInput: {
        height: ((63/667) * Dimensions.get('window').height),
        backgroundColor: '#F5F4F2',
        width: 0.4 * Dimensions.get('window').height,
        marginTop: ((12/667) * Dimensions.get('window').height),
        marginBottom: ((6/667) * Dimensions.get('window').height),
        borderRadius: (0.5) * ((63/667) * Dimensions.get('window').height),
        padding: ((12/667) * Dimensions.get('window').height),
        borderWidth: 1,
        borderColor: 'black'
    },
    passwordInput: {
        height: ((63/667) * Dimensions.get('window').height),
        backgroundColor: '#F5F4F2',
        width: 0.4 * Dimensions.get('window').height,
        marginTop: ((6/667) * Dimensions.get('window').height),
        borderRadius: (0.5) * ((63/667) * Dimensions.get('window').height),
        padding: ((12/667) * Dimensions.get('window').height),
        borderWidth: 1,
        borderColor: 'black'
    },
    loginbutton: {
        height: ((63/667) * Dimensions.get('window').height),
        backgroundColor: '#241C1C',
        width: 0.4 * Dimensions.get('window').height,
        marginTop: ((24/667) * Dimensions.get('window').height),
        marginBottom: ((12/667) * Dimensions.get('window').height),
        borderRadius: (0.5) * ((63/667) * Dimensions.get('window').height),
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: ((18/667) * Dimensions.get('window').height),
        color: '#FFFFFF'
    }
})