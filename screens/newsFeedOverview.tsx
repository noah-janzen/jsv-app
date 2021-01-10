import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import NewsFeedItem from '../components/newsFeedItem';
import colors from '../styles/colors';
import globalObjects from '../globalObjects/globalObjects';

export function NewsFeedOverview({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    let requestUrl = globalObjects.serverURL + '/news-feed';

    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
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
                        renderItem={({ item, index }) => <NewsFeedItem onPress={() => pressHandler(item)} index={index} title={item.title} textSnippet={item.textSnippet} imgURI={item.imgURI} date={item.date} />}
                    />)}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.jsvScreenBackground
    }
});