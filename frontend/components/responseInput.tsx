import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function ResponseInput({handler}) {

    const [textInput, setTextInput] = useState('');
    const [sendDisabled, setSendDisabled] = useState(true);

    const pressHandler = () => {
        if (textInput.length > 0) {
            let text = textInput;
            console.log('Text: ' + text);
            handler(text);
            setTextInput('');
            setSendDisabled(true);
        }
    };

    const checkTextLength = (text) => {
        if(text.length > 0) {
            setSendDisabled(false);
        }
    }

    return (
        <View style={styles.responseView}>

            <TextInput
                style={styles.inputText}
                onChangeText={text => {
                    setTextInput(text);
                    checkTextLength(text);
                }}
                value={textInput}
                placeholder='Deine Antwort…'
                selectionColor={colors.jsvMainGreen}
                multiline
            />

            <Pressable onPress={pressHandler} style={{ marginBottom: 2}} disabled={sendDisabled}>
                <Ionicons size={20} name={'send'} color={sendDisabled ? '#999' : colors.jsvMainGreen } />
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
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    inputText: {
        backgroundColor: '#fff',
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