import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export function PostAttendanceButton({labelText, bgColor, attendanceStatus, pressHandler, isSelected}) {
    
    return (
        <Pressable
            onPressIn={() => pressHandler(attendanceStatus)}
            style={[styles.button, { backgroundColor: bgColor}, isSelected ? styles.buttonSelected : {}]} >
            <Text style={[styles.text, isSelected ? styles.buttonSelected : {}]}>{labelText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 16,
        flex: 1
    },
    buttonSelected: {
        opacity: .4
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase'
    }
});