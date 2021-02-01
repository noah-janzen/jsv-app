import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function ResponseInput({postResponseHandler}) {
    const [textInput, setTextInput] = useState('');
    const [sendDisabled, setSendDisabled] = useState(true);

    const sendResponseHandler = () => {
        if (textInput.length > 0) {
            let text = textInput;

            // remove any whitespace characters at the beginning and the end
            text = text.replace(/^\s+|\s+$/g, '');
            
            // transfer text to the handler that stores response on the server
            postResponseHandler(text);

            // clear text input and disable send button
            setTextInput('');
            setSendDisabled(true);
        }
    };

    // enables/disables the send button
    const checkTextLength = (text) => {
        setSendDisabled(text.length === 0);
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

            <Pressable onPress={sendResponseHandler} style={{ marginBottom: 10}} disabled={sendDisabled}>
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
        backgroundColor: '#fff',
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

        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 8,
        
        minHeight: 40,
        fontSize: 16,
        lineHeight: 20,
        alignSelf: 'stretch',
        flex: 1,
        marginRight: 10
    }
});