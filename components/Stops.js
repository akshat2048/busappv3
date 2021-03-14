import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, ScrollView, Dimensions } from 'react-native'

export default class Stops extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <View style={styles.container}>
            <ScrollView>
            {this.props.stops.map((item, index) => (
            <View style = {styles.element}>
                <Text style = {styles.name}>{item.stopNum}. {item.name}</Text>
                <View style = {styles.emptyLine}></View>
                {item.students.map((item, index) => (
                    <View style = {styles.studentList}>
                        <Text style = {styles.name2}>{item.lastName}, {item.firstName}</Text>
                    </View>
                ))}
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
        marginRight: ((12/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignContent : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        height: Dimensions.get('window').height - ((216/912) * Dimensions.get('window').height) - ((216/912) * Dimensions.get('window').height)
    },
    name : {
        fontSize: ((15/912) * Dimensions.get('window').height),
        alignContent: 'center'
    },
    name2 : {
        fontSize: ((15/912) * Dimensions.get('window').height),
        alignContent: 'center'
    },
    studentList: {

    },
    element: {
        backgroundColor : '#ffffff',
        borderRadius: ((25/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        flexDirection: 'column',
        margin: ((6/912) * Dimensions.get('window').height),
    },
    emptyLine: {
        marginTop: ((5/912) * Dimensions.get('window').height),
        marginBottom: ((5/912) * Dimensions.get('window').height),
        marginLeft: ((1/912) * Dimensions.get('window').height),
        marginRight: ((1/912) * Dimensions.get('window').height),
        borderBottomWidth : ((1/912) * Dimensions.get('window').height),
        borderBottomColor : '#000000'
    }
})