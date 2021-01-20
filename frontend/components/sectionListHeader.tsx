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
        padding: 20
    },
    sectionHeaderText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});