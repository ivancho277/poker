import React, { useState, useEffect } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import ScrollPicker from "react-native-fen-wheel-scroll-picker";
import { AntDesign } from "@expo/vector-icons";
import { GameSubscriber, UseGameStore } from '../../DataStore/GameStore'
// import ActionButton from "react-native-action-button";

// export default class AddTag extends Component {

export const AddTag = (props) => {

    const [{ data }, actions] = UseGameStore();
    const [tag, setTag] = useState("");
    const [selectedTag, setSelectedTag] = useState('choose a Tag')
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        return () => {
            console.log('Updated');
        }
    }, [data])

    return (
        <View>
            <Modal
                animationType={"fade"}
                transparent={false}
                visible={isVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                }}
            >
                {/*All views of Modal*/}
                <View style={styles.modal}>
                    <Text style={{ fontSize: 16 }}>
                        Add a new Tag or select a previous one.
            </Text>
                    <View>
                        <TextInput
                            style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                            placeholder={tag}
                            onChangeText={(tag) => { setTag(tag) }}
                            value={tag}
                        />
                        {/* <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.clearTags(); this.saveToAllTags() }} /> */}
                        <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { actions.addTagToCurrentGame(tag); actions.addTagToAll(tag); setTag('') }} />
                    </View>
                    <Text style={styles.text}>Select a Tag</Text>
                    <View style={{ height: 200 }}>
                        <ScrollPicker
                            dataSource={data.tags === null ? [] : data.tags}
                            selectedIndex={0}
                            renderItem={(data, index, isSelected) => {
                                console.log("CHECK THIS DAMN THING OUT");
                                console.log(data, index);
                                console.log(isSelected);
                            }}
                            onValueChange={(data, selectedIndex) => {
                                data[selectedIndex]
                                setTag(data);
                            }}
                            wrapperHeight={200}
                            wrapperWidth={150}
                            wrapperBackground={"#FFFFFF"}
                            itemHeight={60}
                            highlightColor={"#d8d8d8"}
                            highlightBorderWidth={2}
                            activeItemColor={"#222121"}
                            itemColor={"#B4B4B4"}
                        />
                    </View>

                    <Button
                        title="Done"
                        onPress={() => {
                            console.log("TAGS!: ", data.tags);
                            setIsVisible(false);
                        }}
                    />
                </View>
            </Modal>

            {/*Button will change state to true and view will re-render*/}
            {/* <Button
                    title="Add Tag to Game"
                    onPress={() => { this.setState({ isVisible: true }) }}
                /> */}

            <AntDesign.Button size={22} name="tags" onPress={() => { setIsVisible(true); }}> Add Tags </AntDesign.Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1"
    },
    modal: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00BCD4",
        height: "80%",
        width: "80%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        marginTop: 80,
        marginLeft: 40
    },
    text: {
        color: "#3f2949",
        marginTop: 10
    }
});
