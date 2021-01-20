import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { ChatBubble } from '../components/chatBubble';
import ResponseInput from '../components/responseInput';
import createDateTimeString from '../globalObjects/createDateTimeString';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function Thread({ navigation }) {
    let id = navigation.getParam('id');
    let requestUrl = globalObjects.serverURL + '/thread/id=' + id;

    const [isLoading, setLoading] = useState(false);
    const [thread, setThread] = useState({id: "0", text: "", date: "", number_of_answers: 0, responses: [ { id: "0", text: "", date: "" } ] });
    const [refreshing, setRefreshing] = useState(false);
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);

    
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then(response => response.json())
            .then(json => setThread(json))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // pull to refresh function
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setThread(json))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    const sendMessageHandler = (inputText: string) => {
        let localThread = thread;
        localThread.number_of_answers += 1;
        localThread.responses.push({
            id: "5",
            text: inputText,
            date: new Date().toISOString()
        });
        setThread(localThread);
        setNumberOfAnswers(localThread.number_of_answers);

        console.log(new Date().toISOString());
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Initial message */}
            <View style={styles.message} >
                <Text style={styles.threadText}>{ thread.text }</Text>
                <Text style={styles.threadInfo}>{ createDateTimeString(new Date(thread.date)) }</Text>
            </View>

            {/* Chat bubbles */}
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={thread.responses}
                    extraData={numberOfAnswers}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({item}) => <ChatBubble text={item.text} date={item.date} />}
                    // refreshControl
                />
            )}

            {/* Input field */}
            <ResponseInput handler={sendMessageHandler} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    message: {
        padding: 20,
        backgroundColor: "#fff"
    },
    threadText: {
        fontSize: 16,
        marginBottom: 5
    },
    threadInfo: {
        color: 'gray',
        fontSize: 15
    }
});
