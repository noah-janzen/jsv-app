import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function EventInfoListPoint({ symbolName, text}) {
    return (
        <View style={styles.listPoint}>
            <Ionicons name={symbolName} color={'#444444'} size={16} />
            <Text style={styles.text}>{text}</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    listPoint: {
        flex: 1,
        flexDirection: 'row',
        margin: 0,
        marginBottom: 4
    },
    text: {
        paddingLeft: 8,
        fontSize: 16,
        color: '#000'
    }
});