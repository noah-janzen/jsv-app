import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { ChatBubble } from '../components/chatBubble';
import ResponseInput from '../components/responseInput';
import { getDateTimeString } from '../globalObjects/dateAndTimeFunctions';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function Thread({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [isRefreshing, setRefreshing] = useState(false);
    const [thread, setThread] = useState({ id: "0", text: "", date: "", number_of_answers: 0, responses: [{ id: "0", text: "", date: "" }] });
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);

    let threadId = navigation.getParam('id');
    let requestUrl = globalObjects.serverURL + '/chat/' + threadId;
    let postUrl = globalObjects.serverURL + '/chat/reply/' + threadId;

    // initially load the thread
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then(response => response.json())
            .then(json => setThread(json))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // refresh the thread
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setThread(json))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    // sends a new message to server
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
        <SafeAreaView style={globalStyles.container}>
            {/* Initial message */}
            <View style={styles.initialThreadMessage} >
                <Text style={styles.initialThreadMessageText}>{thread.text}</Text>
                <Text style={styles.threadMetaInfo}>{getDateTimeString(new Date(thread.date))}</Text>
            </View>

            {/* Chat bubbles */}
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={thread.responses}
                    extraData={numberOfAnswers}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                    renderItem={({ item, index }) => <ChatBubble text={item.text} date={item.date} isFirstElement={index === 0} isLastElement={index === thread.responses.length - 1} />}
                />
            )}

            {/* Input field */}
            <ResponseInput handler={sendMessageHandler} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    initialThreadMessage: {
        padding: 20,
        backgroundColor: "#fff"
    },
    initialThreadMessageText: {
        fontSize: 16,
        marginBottom: 5
    },
    threadMetaInfo: {
        color: 'gray',
        fontSize: 15
    }
});
