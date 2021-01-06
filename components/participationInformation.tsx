import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ParticipationInformation({ numberAcceptances, numberRefusals, numberPossibly }) {
    return (
        <View style={styles.container}>
            <Text style={styles.acceptance}>{numberAcceptances}</Text>
            <Text style={styles.refusal}>{numberRefusals}</Text>
            <Text style={styles.possibly}>{numberPossibly}</Text>
        </View>
    );
}

const fontSize = 18;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    acceptance: {
        fontSize: fontSize,
        color: 'green',
        marginRight: 10
    },
    refusal: {
        fontSize: fontSize,
        color: 'red',
        marginRight: 10,
        marginLeft: 10
    },
    possibly: {
        fontSize: fontSize,
        color: '#F1CE09',
        marginRight: 10,
        marginLeft: 10
    },
});

