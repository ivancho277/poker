import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
const calculation = require('./statscalculation.js');
const storage = require("./AsyncStorageController.js");

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            searchedTag: {}
        }
    }

    calculateStats(){
        let totals = calculation.calculateTotalStats(this.state.gamesObj);
        return totals;
    }

    componentDidMount() {
        storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));

            this.setState({
                gamesObj: JSON.parse(res),
                loading: false
            })
            console.log("THIS IS ASYNC")
            console.log(this.state.gamesObj)
        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            throw error;
        })
    }

    logTagsTotals(){
        this.props.logTags().then((res) => {
            console.log("FOUNDDDDD");
            console.log(res);
            let obj = {
                games: res
            }
            let totals = calculation.calculateTotalStats(obj);
            console.log("calls " + totals.calls);
            console.log("folds " + totals.folds);
            console.log("raises " + totals.raises);
            this.setState({
                gamesObj: obj
            })
        }).catch(err){
            console.log("error finding tag");
            throw err;
        } 
    }



    render() {
        return (
            <View style={boxStyles.container}>
                {this.state.loading
                    ?
                    <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                        <ActivityIndicator size='small' color='#0000ff' />
                    </View>
                    :
                    <Text style={{ justifyContent: 'center' }} >{'\n'}
                        calls: {calculation.calculateTotalStats(this.state.gamesObj).calls} {'\n'}
                        folds: {calculation.calculateTotalStats(this.state.gamesObj).folds} {'\n'}
                        raises: {calculation.calculateTotalStats(this.state.gamesObj).raises} {'\n'}
                        tags: 
                </Text>
                }
                <Button title="search test" onPress={() => this.logTagsTotals()}  />
            </View>

        )
    }
}

const boxStyles = StyleSheet.create({
    container: {
        color: '#32CD32',
        width: 150,
        height: 150,
        borderColor: '#000000',
        borderWidth: 3,
        borderStyle: 'solid'
    }
})

const spinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5
    }

});