import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Button = props => {


    return (
        <View>
            <TouchableOpacity style={Style.buttonStyle}>
                <Image source={getSelection(props.type)} />
            </TouchableOpacity>
        </View>
    )


}

// Button.propTypes = {
//     type: propTypes.string
// };
export default Button;
const Metrics = {
    containerWidth: width - 30,
    switchWidth: width / 2.7
}
const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        width: Metrics.containerWidth / 3,
        height: 54,
        justifyContent: "center",
        alignItems: "center"
    }
})