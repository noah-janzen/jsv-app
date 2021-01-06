import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventTypeText({ isInternalEvent }) {
    return (
        <View style={styles.container}>
            <Ionicons style={styles.icon} name={'eye-off-sharp'} size={20} />
            <Text style={styles.text}>{isInternalEvent ? 'Vereinsinterne Veranstaltung' : 'Öffentliche Veranstaltung'}</Text>
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

