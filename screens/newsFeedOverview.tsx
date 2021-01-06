import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import NewsFeedItem from '../components/newsFeedItem';

export function NewsFeedOverview({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://ab40b3b6-aeb8-4688-b5f5-64837ac37966.mock.pstmn.io/news-feed')
            .then((response) => response.json())
            .then((json) => setData(json.newsItems))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const pressHandler = (item) => {
        navigation.navigate('NewsArticle', item);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <NewsFeedItem onPress={() => pressHandler(item)} title={item.title} textSnippet={item.textSnippet} imgURI={item.imgURI} />}
                    />)}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc"
    }
});