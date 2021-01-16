import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export function PostAttendanceButton({labelText, bgColor, attendanceStatus, pressHandler}) {
    
    return (
        <Pressable
            onPressIn={() => pressHandler(attendanceStatus)}
            style={[styles.button, { backgroundColor: bgColor}]} >
            <Text style={styles.text}>{labelText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 16,
        flex: 1
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase'
    }
});