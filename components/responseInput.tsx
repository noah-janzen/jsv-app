import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function ResponseInput() {

    const [textInput, setTextInput] = useState('');
    const pressHandler = () => {
        if (textInput.length > 0) {
            let text = textInput;
            console.log(text);
            setTextInput('');
        }
    };

    return (
        <View style={styles.responseView}>

            <TextInput
                style={styles.inputText}
                onChangeText={text => setTextInput(text)}
                value={textInput}
                placeholder='Deine Antwort…'
                selectionColor={colors.jsvMainGreen}
                multiline
            />

            <Pressable onPress={pressHandler}>
                <Ionicons size={15} name={'send'} color={colors.jsvMainGreen
                } />
            </Pressable>

        </View>

    );

}

const styles = StyleSheet.create({
    responseView: {
        width: "100%",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputText: {
        backgroundColor: '#fff',
        maxHeight: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 3,
        paddingBottom: 3,
        alignSelf: 'stretch',
        flex: 1,
        marginRight: 10
    }
});