import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

export default function ThreadItem({ text, date, numberAnswers, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={globalStyles.item}>
                <View style={styles.threadItemContent}>
                    <Text style={styles.threadText} numberOfLines={3}>{text}</Text>
                    <Text style={styles.threadInfo}>{date} - {numberAnswers} Antworten</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    threadItemContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 16
    },
    threadText: {
        fontSize: 18,
        marginBottom: 5
    },
    threadInfo: {
        color: 'gray',
        fontSize: 15
    }
})