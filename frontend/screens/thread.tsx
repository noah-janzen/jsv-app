import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { ChatBubble } from '../components/chatBubble';
import ResponseInput from '../components/responseInput';
import { getDateTimeString } from '../globalObjects/dateAndTimeFunctions';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function Thread({ navigation }) {
    let id = navigation.getParam('id');
    let requestUrl = globalObjects.serverURL + '/chat/' + id;
    let postUrl = globalObjects.serverURL + '/chat/reply/' + id;

    const [isLoading, setLoading] = useState(false);
    const [thread, setThread] = useState({ id: "0", text: "", date: "", number_of_answers: 0, responses: [{ id: "0", text: "", date: "" }] });
    const [refreshing, setRefreshing] = useState(false);
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);


    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then(response => response.json())
            .then(json => { console.log(json); setThread(json); })
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
        // send new thread to server
        fetch(postUrl, {
            method: 'POST',
            headers: globalObjects.globalHeader.headers,
            body: JSON.stringify({
                reply_text: inputText
            })
        })
            .finally(() => onRefresh());
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Initial message */}
            <View style={styles.message} >
                <Text style={styles.threadText}>{thread.text}</Text>
                <Text style={styles.threadInfo}>{getDateTimeString(new Date(thread.date))}</Text>
            </View>

            {/* Chat bubbles */}
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={thread.responses}
                    extraData={numberOfAnswers}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({ item, index }) => <ChatBubble text={item.text} date={item.date} isFirstElement={index === 0} isLastElement={index === thread.responses.length - 1} />}
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
