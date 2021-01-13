import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { ChatBubble } from '../components/chatBubble';
import ResponseInput from '../components/responseInput';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function Thread({ navigation }) {
    let id = navigation.getParam('id');
    let requestUrl = globalObjects.serverURL + '/thread?id=' + id;

    const [isLoading, setLoading] = useState(false);
    const [responses, setResponses] = useState([
        {
            "text": "Das ist der erste Kommentar",
            "date": "2021-01-01T18:25:43.511Z"
        },
        {
            "text": "Das ist der zweite Kommentar!",
            "date": "2021-01-02T18:25:43.511Z"
        },
        {
            "text": "Das ist der 3. Kommentar",
            "date": "2021-01-03T18:25:43.511Z"
        },
        {
            "text": "Das ist der vieeerte Kommentar",
            "date": "2021-01-03T20:25:43.511Z"
        },
        {
            "text": "Das ist der (5) Kommentar",
            "date": "2021-01-04T18:25:43.511Z"
        }
    ]);
    // refreshing
    /*
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then(response => response.json())
            .then(json => setResponses(json.responses))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    */
    console.log(responses);

    return (
        <SafeAreaView style={styles.container}>
            {/* Initial message */}
            <View style={styles.message}>
                <Text style={styles.threadText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </Text>
                <Text style={styles.threadInfo}>16.01.2020 - 10:34 Uhr</Text>
            </View>

            {/* Chat bubbles */}
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={responses}
                    renderItem={({item}) => <ChatBubble text={item.text} date={item.date} />}
                    // refreshControl
                />
            )}

            {/* Input field */}
            <ResponseInput />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    message: {
        padding: 20
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
