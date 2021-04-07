import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

//Convert to component and rerender
//Refer to https://www.educative.io/edpresso/how-to-force-a-react-component-to-re-render 

class StudentsDisplay extends Component {

    constructor(props) {
        super(props)
    }

    getButtonStyle(isSelected) {
        if (isSelected) {
            return styles.button2
        } else {
            return styles.button
        }
    }

    getDropdownDownMenu() {
        
    }

    render() {
        const cbfunction = this.props.cbfunction
        console.log("RENDERING STUDENTSDISPLAY")
        //console.log(students) 
        
        return (
        <View style={styles.container}>
            <ScrollView>
            {this.props.students.map((item, index) => (
                <View>
                    <View style = {styles.element}>
                    <TouchableOpacity onPress = {() => {
                            cbfunction(item.key)
                        }} style = {this.getButtonStyle(item.isSelected)}>
                    </TouchableOpacity>
                    <Text style = {styles.elementText}>{item.lastName}, {item.firstName}</Text>
                    </View>
                    <View style={styles.emptyLine}></View>
                </View>
            ))}
            </ScrollView>
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor : '#ffffff',
        marginLeft : ((12.5/912) * Dimensions.get('window').height),
        marginTop : ((12.5/912) * Dimensions.get('window').height),
        padding : ((12.5/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignContent : 'center',
        borderWidth : ((2.5/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        height: Dimensions.get('window').height - ((54/912) * Dimensions.get('window').height) - ((68/912) * Dimensions.get('window').height)
    },
    element: {
        backgroundColor : '#ffffff',
        borderRadius: ((25/912) * Dimensions.get('window').height),
        padding: ((12.5/912) * Dimensions.get('window').height),
        borderWidth : ((0/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        flexDirection: 'row',
        margin: ((6/912) * Dimensions.get('window').height),
    },
    elementText: {
        fontSize: ((18/912) * Dimensions.get('window').height),
        alignContent: 'center'
    },
    button: {
        borderWidth: ((2.5/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        height : ((25/912) * Dimensions.get('window').height),
        width: ((25/912) * Dimensions.get('window').height),
        marginRight: ((12.5/912) * Dimensions.get('window').height),
        paddingRight: ((12.5/912) * Dimensions.get('window').height),
        borderRadius: ((12.5/912) * Dimensions.get('window').height)
    },
    button2: {
        borderWidth: ((2.5/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        backgroundColor: '#448ee4',
        height : ((25/912) * Dimensions.get('window').height),
        width: ((25/912) * Dimensions.get('window').height),
        marginRight: ((12.5/912) * Dimensions.get('window').height),
        paddingRight: ((12.5/912) * Dimensions.get('window').height),
        borderRadius: ((12.5/912) * Dimensions.get('window').height)
    },
    emptyLine: {
        marginTop: ((5/912) * Dimensions.get('window').height),
        marginBottom: ((5/912) * Dimensions.get('window').height),
        marginLeft: ((1/912) * Dimensions.get('window').height),
        marginRight: ((1/912) * Dimensions.get('window').height),
        borderBottomWidth : ((1/912) * Dimensions.get('window').height),
        borderBottomColor : '#448ee4'
    }
})

export default StudentsDisplay