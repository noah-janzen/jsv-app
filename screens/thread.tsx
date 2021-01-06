import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

export function Thread({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.message}>
                <Text style={styles.threadText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </Text>
                <Text style={styles.threadInfo}>16.01.2020 - 10:34 Uhr</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    message: {
        padding: 20
    },
    threadText: {
        fontSize: 16,
        marginBottom: 5
    },
    threadInfo: {
        color: 'gray',
        fontSize: 15
    }
});
