import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { getDateString } from '../globalObjects/dateAndTimeFunctions';
import globalStyles from '../styles/globalStyles';

export default function ThreadItem({ textSnippet, date, numberOfAnswers, onPress, index }) {
    return (
        <Pressable onPress={onPress}>
            <View style={[globalStyles.item, index == 0 ? globalStyles.firstItem : globalStyles.notFirstItem]}>
                <View style={styles.threadItemContent}>
                    <Text style={styles.threadText} numberOfLines={3}>{textSnippet}</Text>
                    <Text style={styles.threadInfo}>{getDateString(date)} · {numberOfAnswers} Antworten</Text>
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