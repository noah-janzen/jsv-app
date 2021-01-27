import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function SectionListHeader({ text }) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: colors.jsvScreenBackground,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    sectionHeaderText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});