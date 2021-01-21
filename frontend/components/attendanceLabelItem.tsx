import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function AttendanceLabelItem({numberOfResponses, attendanceSymbol, attendanceColor}) {
    return (
        <View style={[styles.attendanceLabelItem, {backgroundColor: attendanceColor}]}>
            <View style={styles.attendanceSymbol}>
                <Ionicons name={attendanceSymbol} color={'#fff'} />
            </View>
            <View style={styles.attendanceNumber}>
                <Text style={styles.attendanceLabelItemText}>{numberOfResponses}</Text>
            </View>
        </View>
    );
}

let paddingTopBottom = 3;
let paddingLeftRight = 5;
const styles = StyleSheet.create({
    attendanceLabelItem: {
        color: '#fff',

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        borderRadius: 4,
        marginRight: 8
    },
    attendanceSymbol: {
        paddingTop: paddingTopBottom,
        paddingBottom: paddingTopBottom,
        paddingLeft: paddingLeftRight,
        paddingRight: paddingLeftRight,
        
    },
    attendanceNumber: {
        paddingTop: paddingTopBottom,
        paddingBottom: paddingTopBottom,
        paddingLeft: 1.5*paddingLeftRight,
        paddingRight: 1.5*paddingLeftRight,
        backgroundColor: 'rgba(255,255,255,.15)',
        minWidth: 30
    },
    attendanceLabelItemText: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center'
    }
});