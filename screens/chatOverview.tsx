import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList, RefreshControl } from 'react-native';
import ThreadItem from '../components/threadItem';
import SectionListHeader from '../components/sectionListHeader';
import colors from '../styles/colors';
import globalObjects from '../globalObjects/globalObjects';

export function ChatOverview({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [threads, setThreads] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    let requestUrl = globalObjects.serverURL + '/chat';

    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setThreads(json.chat_by_month))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const pressHandler = (item) => {
        navigation.navigate('Thread', item);
    }

    // pull to refresh function
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setThreads(json.chat_by_month))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> :
                    (<SectionList
                        sections={threads}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        renderItem={({ item }) => (<ThreadItem onPress={() => pressHandler(item)} textSnippet={item.text_snippet} date={item.date} numberOfAnswers={item.number_of_answers} />)}
                        renderSectionHeader={({ section: { title } }) => (<SectionListHeader text={title} />)}
                    />
                    )}
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