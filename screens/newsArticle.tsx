import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ScrollView } from 'react-native';

export function NewsArticle({ navigation }) {
    let id = navigation.getParam('id');
    let requestUrl = 'https://ab40b3b6-aeb8-4688-b5f5-64837ac37966.mock.pstmn.io/news-article?id=' + id;
    //console.log(id);
    //console.log(requestUrl);

    const [isLoading, setLoading] = useState(true);
    const [newsArticle, setNewsArticle] = useState([]);

    useEffect(() => {
        fetch(requestUrl)
            .then((response) => response.json())
            .then((json) => setNewsArticle(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    console.log(newsArticle); 

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={{ uri: navigation.getParam('imgURI') }} style={styles.img}></ImageBackground>
                <Text style={styles.headline}>{navigation.getParam('title')}</Text>
                <Text style={styles.text}>{newsArticle.fullText}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const padding = 16;

const styles = StyleSheet.create({
    img: {
        height: 200,
        marginBottom: 10
    },
    headline: {
        fontSize: 18,
        color: "#1D2026",
        fontWeight: "bold",
        marginBottom: 3,
        marginLeft: padding,
        marginRight: padding
    },
    text: {
        fontSize: 16,
        color: "#2f3542",
        marginLeft: padding,
        marginRight: padding,
        marginBottom: padding
    }
});