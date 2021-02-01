import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { getDateString } from '../globalObjects/dateAndTimeFunctions';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function NewsArticle({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [newsArticle, setNewsArticle] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);

    let newsItemId = navigation.getParam('id');
    let requestUrl = globalObjects.serverURL + '/news/' + newsItemId;

    // initally load the news article
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then(response => response.json())
            .then(json => setNewsArticle(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // refresh the news article
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setNewsArticle(json))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={globalStyles.flex}>
            <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                <ImageBackground source={{ uri: newsArticle.imgURI }} style={styles.newsImage}></ImageBackground>
                <Text style={styles.newsHeadline}>{newsArticle.title}</Text>
                <Text style={styles.newsText}>{newsArticle.fullText}</Text>
                <Text style={[globalStyles.date, styles.newsDate]}>{getDateString(new Date(newsArticle.date))}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const padding = 16;

const styles = StyleSheet.create({
    newsImage: {
        height: 200,
        marginBottom: 10
    },
    newsHeadline: {
        fontSize: 18,
        color: "#1D2026",
        fontWeight: "bold",
        marginBottom: 3,
        marginLeft: padding,
        marginRight: padding
    },
    newsText: {
        fontSize: 16,
        color: "#2f3542",
        marginLeft: padding,
        marginRight: padding
    },
    newsDate: {
        marginLeft: padding,
        marginRight: padding,
        marginBottom: padding
    }
});