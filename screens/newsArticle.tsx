import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';

export function NewsArticle({ navigation }) {
    return (
        <SafeAreaView>
            <ImageBackground source={{ uri: navigation.getParam('imgURI') }} style={styles.img}></ImageBackground>
            <Text style={styles.title}>{navigation.getParam('title')}</Text>
            <Text style={styles.text}>{navigation.getParam('textSnippet')}</Text>
        </SafeAreaView>
    )
}

const padding = 16;

const styles = StyleSheet.create({
    img: {
        height: 200,
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: padding
    },
    text: {
        fontSize: 16,
        padding: padding
    }
})