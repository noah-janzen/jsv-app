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
const distance = 10;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    acceptance: {
        fontSize: fontSize,
        color: 'green',
        marginRight: distance
    },
    refusal: {
        fontSize: fontSize,
        color: 'red',
        marginRight: distance,
        marginLeft: distance
    },
    possibly: {
        fontSize: fontSize,
        color: '#ccae02',
        marginRight: distance,
        marginLeft: distance
    },
});