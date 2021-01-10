import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import globalStyles from '../styles/globalStyles';
import createDateString from '../globalObjects/createDateString';

const NewsFeedItem = ({ title, textSnippet, imgURI, onPress, index, date }) => {    

    return (
        <Pressable onPress={onPress}>
            <View style={[globalStyles.item, index == 0 ? globalStyles.firstItem : globalStyles.notFirstItem]}>
                <ImageBackground source={{ uri: imgURI }} style={styles.img}></ImageBackground>
                <Text style={styles.headline}>{title}</Text>
                <Text numberOfLines={3} style={styles.textSnippet}>{textSnippet}</Text>
                <Text style={globalStyles.date}>{createDateString(new Date(date))}</Text>
            </View>
        </Pressable>
    );
}

const padding = 16;

const styles = StyleSheet.create({
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