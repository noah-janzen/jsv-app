import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList, RefreshControl, Pressable, Modal, TextInput, FlatList } from 'react-native';
import ThreadItem from '../components/threadItem';
import colors from '../styles/colors';
import globalObjects from '../globalObjects/globalObjects';
import { Ionicons } from '@expo/vector-icons';
import { ChatListFactory } from '../globalObjects/chatListFactory';
import globalStyles from '../styles/globalStyles';

export function ChatOverview({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);
    const [threads, setThreads] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newThreadText, setNewThreadText] = useState('');

    let requestUrl = globalObjects.serverURL + '/chat';
    let postUrl = globalObjects.serverURL + '/chat/create';

    // initially load the threads
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then(json => json.threadListItems)
            .then(threadsRaw =>
                threadsRaw.map(threadRaw => ChatListFactory.fromRaw(threadRaw)))
            .then(threads => setThreads(threads))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // refresh the threads
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then(object => object.threadListItems)
            .then(chatListRaw =>
                chatListRaw.map(chatListItemRaw => ChatListFactory.fromRaw(chatListItemRaw)))
            .then(chatList => setThreads(chatList))
            .catch(error => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    // navigates to the thread view
    const navigateToThread = (item) => {
        navigation.navigate('Thread', item);
    }

    // creates new thread
    const pressSendHandler = (text) => {
        if (newThreadText.length > 0) {
            let text: string = newThreadText;
            // remove any whitespace characters at the beginning and the end
            text = text.replace(/^\s+|\s+$/g, '');

            // send new thread to server
            fetch(postUrl, {
                method: 'POST',
                headers: globalObjects.globalHeader.headers,
                body: JSON.stringify({
                    text: newThreadText
                })
            })
                .finally(() => onRefresh());

            // clear thread input field and close modal 
            setNewThreadText('');
            setModalOpen(false);
        }
    }

    return (
        <SafeAreaView style={globalStyles.flex}>

            { /* Modal to create a new thread, pops up when user clicks on + icon. */ }
            <Modal visible={isModalOpen} transparent={true} animationType='slide'>
                <SafeAreaView style={styles.modalSafeAreaView}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => setModalOpen(false)}>
                            <Ionicons size={30} name={'arrow-back-outline'} color={'#000'} style={styles.closeIcon} />
                        </Pressable>

                        <Pressable onPress={pressSendHandler}>
                            <Text style={styles.modalHeaderText}>Absenden</Text>
                        </Pressable>
                    </View>

                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder='Deine Nachricht…'
                            onChangeText={text => setNewThreadText(text)}
                            multiline
                            value={newThreadText}
                            style={styles.inputText}
                            autoFocus={true}
                            textAlignVertical={'top'}
                        />
                    </View>
                </SafeAreaView>
            </Modal>

            { /* List with threads, sorted descending by date */ }
            <View style={globalStyles.container}>
                {isLoading ? <ActivityIndicator /> :
                    (<FlatList
                        data={threads}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                        renderItem={({ item, index }) => (<ThreadItem onPress={() => navigateToThread(item)} index={index} textSnippet={item.textSnippet} date={item.date} numberOfAnswers={item.numberOfAnswers} />)}
                    />
                    )}

                { /* Button to create a new thread, triggers modal */ }
                <Pressable
                    style={styles.addThreadButton}
                    onPress={() => setModalOpen(true)}>
                    <Ionicons size={60} name={'add-circle-outline'} color={'#5D5D5D'} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    addThreadButton: {
        position: 'absolute',
        bottom: 4,
        left: '50%',
        marginLeft: -30,
        borderRadius: 30
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.jsvMainGreen,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8
    },
    modalHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    modalContent: {
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column'
    },
    modalSafeAreaView: {
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    closeIcon: {
        alignSelf: 'flex-end'
    },
    inputText: {
        fontSize: 18,
        padding: 16,
        marginTop: 16,
        paddingTop: 0,
        backgroundColor: '#fff',
        height: '85%'
    }
});