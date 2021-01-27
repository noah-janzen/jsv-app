import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import createDateString from '../globalObjects/createDateString';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

export default function ThreadItem({ textSnippet, date, numberOfAnswers, onPress, index }) {
    return (
        <Pressable onPress={onPress}>
            <View style={[globalStyles.item, index == 0 ? globalStyles.firstItem : globalStyles.notFirstItem]}>
                <View style={styles.threadItemContent}>
                    <Text style={styles.threadText} numberOfLines={3}>{textSnippet}</Text>
                    <Text style={styles.threadInfo}>{createDateString(date)} · {numberOfAnswers} Antworten</Text>
                </View>
            </View>
        </Pressable>
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