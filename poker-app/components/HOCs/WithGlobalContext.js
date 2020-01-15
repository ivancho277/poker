import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MyContext } from '../../stateContext/GlobalState'


function WithGlobalContext(Component) {
    return function WrapperComponent(props) {
        return (
            <MyContext.Consumer>
                {state => <Component {...props} context={state} modifiers={modifiers} />}
            </MyContext.Consumer>

        )
    }
}



