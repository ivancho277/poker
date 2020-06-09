import React, { Component, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore';


export const StoreLoader = Component => {
    //const [state, actions] = UseGameStore();
    return function WrapperComponent({isLoading, ...props}) {
        if (!isLoading) {
            return <Component {...props} />;
        }
        return (
            <View>
                <Text> ... Loading</Text>
            </View>

        )
    }
}



