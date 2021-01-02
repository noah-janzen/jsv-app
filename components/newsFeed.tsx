import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import NewsFeedItem from './newsFeedItem';

const NewsFeed = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://ab40b3b6-aeb8-4688-b5f5-64837ac37966.mock.pstmn.io/get30NewsArticleFeedItems')
        .then((response) => response.json())
        .then((json) => setData(json.newsItems))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);


    return(
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={ data }
                    renderItem={({item}) => <NewsFeedItem title={item.title} textSnippet={item.textSnippet} imgURI={item.imgURI} />}
                />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc"
    }
});

export default NewsFeed;