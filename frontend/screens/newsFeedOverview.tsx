import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, RefreshControl, ToastAndroid } from 'react-native';
import NewsFeedItem from '../components/newsFeedItem';
import colors from '../styles/colors';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function NewsFeedOverview({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [newsFeedListItems, setNewsFeedListItems] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);

    let requestUrl = globalObjects.serverURL + '/news';

    // initially load the news feed list items
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setNewsFeedListItems(json.newsListItems))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // refresh the news feed list items
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setNewsFeedListItems(json.newsListItems))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    // navigates to news detail view
    const navigateToNewsArticle = (item) => {
        navigation.navigate('NewsArticle', item);
    }

    return (
        <SafeAreaView style={globalStyles.flex}>
            <View style={globalStyles.container}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={newsFeedListItems}
                        renderItem={({ item, index }) => <NewsFeedItem onPress={() => navigateToNewsArticle(item)} index={index} title={item.title} textSnippet={item.textSnippet} imgURI={item.imgURI} date={item.date} />}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                    />)}
            </View>
        </SafeAreaView>
    );
}
