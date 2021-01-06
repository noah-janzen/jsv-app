import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DateAndTimeText({ date, time }) {
    return (
        <View style={styles.container}>
            <Ionicons style={styles.icon} name={'ios-calendar'} size={20} />
            <Text style={styles.text}>{date} - {time} Uhr</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 18
    },
    icon: {
        marginRight: 10
    }
});