import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import createDateString from '../globalObjects/createDateString';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

export default function ThreadItem({ textSnippet, date, numberOfAnswers, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={globalStyles.item}>
                <View style={styles.threadItemContent}>
                    <Text style={styles.threadText} numberOfLines={3}>{textSnippet}</Text>
                    <Text style={styles.threadInfo}>{createDateString(new Date(date))} · {numberOfAnswers} Antworten</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    threadItemContent: {
        flex: 1,
        flexDirection: 'column'
    },
    threadText: {
        fontSize: 16,
        marginBottom: 5
    },
    threadInfo: {
        color: 'gray',
        fontSize: 15
    }
})