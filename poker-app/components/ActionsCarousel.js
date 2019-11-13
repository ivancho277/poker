import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Carousel from 'react-native-anchor-carousel';


export default class ActionsCarousel extends Component {

    state = {
        actions: ['call', 'fold', 'raise']
    }


    renderItem = ({item, index}) => {
        const {backgroundColor} = item;
        return (
            <Button style={{width: 40}}
                              onPress={() => {
                                  this._carousel.scrollToIndex(index);
                              }}
                              title={item}>
                 <Text>{item}</Text>
            </Button>)
    };

    render() {
        return (
            <View style={styles.carouselContainer}>
            <Carousel  style={styles.carousel}
                       data={this.state.actions}
                       renderItem={this.renderItem}
                       itemWidth={200}
                    //    containerWidth={width - 20} 
                       separatorWidth={0}
                       ref={(c) => {
                           this._carousel = c;
                       }}
                       //pagingEnable={false}
                       //minScrollDistance={20}
                   />
       </View>
        )
    }

    
}

const styles = StyleSheet.create({ 
    carouselContainer: {
        height:120,  
        justifyContent: 'center',
    },
        carousel: {
            flex:1,
    } 
})


