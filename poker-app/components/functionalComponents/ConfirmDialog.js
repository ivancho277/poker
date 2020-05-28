import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export function ConfirmDialog(props){
    const [isVisible, setIsVisible] = useState(false);

    _showDialog = () => {setIsVisible(true)};
    _hideDialog = () => {setIsVisible(false)};



    return(
        <View>
            
        </View>


    )

    



}