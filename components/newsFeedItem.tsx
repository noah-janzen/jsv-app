import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

const NewsFeedItem = ({ title, textSnippet, imgURI, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.newsFeedItem}>
                <ImageBackground source={{ uri: imgURI }} style={styles.img}></ImageBackground>
                <Text style={styles.headline}>{title}</Text>
                <Text numberOfLines={3} style={styles.textSnippet}>{textSnippet}</Text>
            </View>
        </TouchableOpacity>
    );
}

const padding = 16;

const styles = StyleSheet.create({
    newsFeedItem: {
        borderRadius: 10,
        padding: padding,
        backgroundColor: "#fff",
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOpacity: 0.01,
        shadowRadius: 4,
        elevation: 5,
    },
    headline: {
        fontSize: 18,
        color: "#1D2026",
        fontWeight: "bold",
        marginBottom: 3
    },
    textSnippet: {
        fontSize: 16,
        color: "#2f3542"
    },
    img: {
        height: 200,
        marginTop: -padding,
        marginLeft: -padding,
        marginRight: -padding,
        marginBottom: 10
    }
})

export default NewsFeedItem;