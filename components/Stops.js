import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, Button, TouchableOpacity } from 'react-native'

export default class Stops extends Component {

    state = {
        isTappedArray: [
            {isSelected: false}
        ]
    }

  constructor(props) {
      super(props);
      for (var i = 0; i < this.props.stops.length; i++) {
          let obj = {isSelected: false}
          this.state.isTappedArray.push(obj)
      }
      this.getDropdownDownMenu = this.getDropdownDownMenu.bind(this)
      this.generateStylesForStopText = this.generateStylesForStopText.bind(this)
      this.generateTextStylesForElement = this.generateTextStylesForElement.bind(this)
  }

  getDropdownDownMenu(item) {
    if ((this.state.isTappedArray[item.stopNum-1].isSelected)) {
        return (<View>
            {item.students.map((item, index) => (
                <View style = {styles.studentList}>
                    <Text style = {styles.name3}>       {'\u2794'} {item.lastName}, {item.firstName}</Text>
                </View>
            ))}
        </View>)
    } else {
        return (
            <View>
                
            </View>
        )
    }
  }

  changeIsSelected(item) {
    let tappedArray = this.state.isTappedArray

    if (tappedArray[item.stopNum-1].isSelected) {
        tappedArray[item.stopNum-1].isSelected = false
    } else {
        tappedArray[item.stopNum-1].isSelected = true
    }

    this.setState({ isTappedArray: tappedArray}, () => {
        //Callback
    })
  }

  generateStylesForStopText(item) {
    let style1 = {
        backgroundColor : '#ffffff',
        borderRadius: ((25/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        flexDirection: 'column',
        margin: ((6/912) * Dimensions.get('window').height)
    }
    let style2 = {
        backgroundColor : '#03AC13',
        borderRadius: ((25/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        flexDirection: 'column',
        margin: ((6/912) * Dimensions.get('window').height)
    }
        if (item.students.length >= 1) {
            return style2
        } else {
            return style1
        }
  }

  generateTextStylesForElement(item) {
        let style1 = {
        fontSize: ((18/912) * Dimensions.get('window').height),
        alignContent: 'center',
        color: 'black',
        fontFamily: 'monospace',
        }
        let style2 = {
            fontSize: ((18/912) * Dimensions.get('window').height),
            alignContent: 'center',
            color: 'white',
            fontFamily: 'monospace',
        }

        if (item.students.length >= 1) {
            return style2
        } else {
            return style1
        }
  }

  render() {
    return (
        <View style={styles.container}>
            <ScrollView>
            {this.props.stops.map((item) => (
                <View >
                    <View style={styles.tempHorizontalFlex}>
                        <TouchableOpacity style = {this.generateStylesForStopText(item)} onPress={() => {
                            this.changeIsSelected.bind(item)
                            this.changeIsSelected(item)
                        }}>
                            <View style={styles.tempHorizontalFlex}> 
                                <Text style = {this.generateTextStylesForElement(item)}>{item.stopNum}. {item.name.substring(0, item.name.length-10)} </Text>
                            </View>
                            {this.getDropdownDownMenu(item)}
                        </TouchableOpacity>
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
        marginLeft : ((12/912) * Dimensions.get('window').height),
        marginTop : ((12/912) * Dimensions.get('window').height),
        marginRight: ((12/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderRadius : ((25/912) * Dimensions.get('window').height),
        alignContent : 'center',
        borderWidth : ((1/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        height: Dimensions.get('window').height - ((108/912) * Dimensions.get('window').height) - ((216/912) * Dimensions.get('window').height)
    },
    name : {
        fontSize: ((18/912) * Dimensions.get('window').height),
        alignContent: 'center',
        fontFamily: 'monospace',
    },
    name2 : {
        fontSize: ((15/912) * Dimensions.get('window').height),
        alignContent: 'center',
        fontFamily: 'monospace',
    },
    name3 : {
        fontSize: ((15/912) * Dimensions.get('window').height),
        alignContent: 'center',
        color: 'white',
        fontFamily: 'monospace',
    },
    arrow: {
        fontSize: ((30/912) * Dimensions.get('window').height),
        color : '#000000',
        fontFamily: 'monospace',
    },
    element: {
        backgroundColor : '#ffffff',
        borderRadius: ((25/912) * Dimensions.get('window').height),
        padding: ((12/912) * Dimensions.get('window').height),
        borderColor: '#448ee4',
        flexDirection: 'column',
        margin: ((6/912) * Dimensions.get('window').height)
    },
    emptyLine: {
        marginTop: ((5/912) * Dimensions.get('window').height),
        marginBottom: ((5/912) * Dimensions.get('window').height),
        marginLeft: ((1/912) * Dimensions.get('window').height),
        marginRight: ((1/912) * Dimensions.get('window').height),
        borderBottomWidth : ((1/912) * Dimensions.get('window').height),
        borderBottomColor : '#000000'
    },
    tempHorizontalFlex: {
        flexDirection: 'row',
        width: ((1.5 * Dimensions.get('window').width/4))
    },
    numberView: {
        borderRadius : ((30/912) * Dimensions.get('window').height),
        alignItems : 'center',
        padding : ((18/912) * Dimensions.get('window').height),
        margin: ((18/912) * Dimensions.get('window').height),
        borderColor : '#000000',
        backgroundColor: '#ffd800',
        color: '#939598',
        fontWeight: 'bold',
        fontSize: ((20/912) * Dimensions.get('window').height)
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