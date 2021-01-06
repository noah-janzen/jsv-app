import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LocationText({ location }) {
    return (
        <View style={styles.container}>
            <Ionicons style={styles.icon} name={'location-sharp'} size={20} />
            <Text style={styles.text}>{location}</Text>
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

