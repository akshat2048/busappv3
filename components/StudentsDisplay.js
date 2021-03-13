import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

//Convert to component and rerender
//Refer to https://www.educative.io/edpresso/how-to-force-a-react-component-to-re-render 

class StudentsDisplay extends Component {

    constructor(props) {
        super(props)
    }

    getButtonStyle(isSelected) {
        console.log("getButtonStyle() called")
        if (isSelected) {
            console.log("IS SELECTED IS TRUE")
            return styles.button2
        } else {
            console.log("IS SELECTED IS FALSE")
            return styles.button
        }
    }
 
    // renderOld() {
    //     const cbfunction = this.props.cbfunction
    //     console.log("RENDERING STUDENTSDISPLAY")
    //     //console.log(students) 
        
    //     return (
    //     <View style={styles.container}>
    //         <FlatList data = {this.props.students} renderItem = {({ item }) => (
    //             <View style = {styles.element}>
    //                 <TouchableOpacity onPress = {() => {
    //                         cbfunction(item.key)
    //                     }} style = {this.getButtonStyle(item.isSelected)}>
    //                 </TouchableOpacity>
    //                 <Text style = {styles.elementText}>{item.lastName}, {item.firstName}</Text>
    //             </View>
    //         )}>
    //         </FlatList>
    //     </View>
    //     )
    // }

    render() {
        const cbfunction = this.props.cbfunction
        console.log("RENDERING STUDENTSDISPLAY")
        //console.log(students) 
        
        return (
        <View style={styles.container}>
            <ScrollView>
            {this.props.students.map((item, index) => (
                <View style = {styles.element}>
                    <TouchableOpacity onPress = {() => {
                            cbfunction(item.key)
                        }} style = {this.getButtonStyle(item.isSelected)}>
                    </TouchableOpacity>
                    <Text style = {styles.elementText}>{item.lastName}, {item.firstName}</Text>
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
        marginLeft : ((12/912) * Dimensions.get('window').height),
        marginTop : ((12/912) * Dimensions.get('window').height),
        padding : ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignContent : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        height: Dimensions.get('window').height - ((216/912) * Dimensions.get('window').height) - ((216/912) * Dimensions.get('window').height)
    },
    element: {
        backgroundColor : '#ffffff',
        borderRadius: ((25/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        flexDirection: 'row',
        margin: ((6/912) * Dimensions.get('window').height),
    },
    elementText: {
        fontSize: ((15/912) * Dimensions.get('window').height),
        alignContent: 'center'
    },
    button: {
        borderWidth: ((1/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        height : ((25/912) * Dimensions.get('window').height),
        width: ((25/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        paddingRight: ((12/912) * Dimensions.get('window').height),
        borderRadius: ((12.5/912) * Dimensions.get('window').height)
    },
    button2: {
        borderWidth: ((1/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        backgroundColor: '#448ee4',
        height : ((25/912) * Dimensions.get('window').height),
        width: ((25/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        paddingRight: ((12/912) * Dimensions.get('window').height),
        borderRadius: ((12.5/912) * Dimensions.get('window').height)
    }
})

export default StudentsDisplay