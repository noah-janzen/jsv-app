import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';
import createDateString from '../globalObjects/createDateString';

export function NewsArticle({ navigation }) {
    let id = navigation.getParam('id');
    let requestUrl = globalObjects.serverURL + '/news-article/' + id;

    const [isLoading, setLoading] = useState(true);
    const [newsArticle, setNewsArticle] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // initally load news article
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then(response => response.json())
            .then(json => setNewsArticle(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // pull to refresh function
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setNewsArticle(json))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <ImageBackground source={{ uri: newsArticle.imgURI }} style={styles.img}></ImageBackground>
                <Text style={styles.headline}>{newsArticle.title}</Text>
                <Text style={styles.text}>{newsArticle.fullText}</Text>
                <Text style={[globalStyles.date, styles.date]}>{createDateString(new Date(newsArticle.date))}</Text>
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
        marginRight: padding
    },
    date: {
        marginLeft: padding,
        marginRight: padding,
        marginBottom: padding
    }
});