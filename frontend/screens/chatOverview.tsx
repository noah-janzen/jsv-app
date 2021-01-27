import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList, RefreshControl, Pressable, Modal, TextInput } from 'react-native';
import ThreadItem from '../components/threadItem';
import SectionListHeader from '../components/sectionListHeader';
import colors from '../styles/colors';
import globalObjects from '../globalObjects/globalObjects';
import { Ionicons } from '@expo/vector-icons';
import getMonthStringByMonthId from '../globalObjects/getMonthStringByMonthId';

export function ChatOverview({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [threads, setThreads] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [threadText, setThreadText] = useState('');

    let requestUrl = globalObjects.serverURL + '/chat';
    let postUrl = globalObjects.serverURL + '/chat/create';

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

    const pressSendHandler = (text) => {
        if (threadText.length > 0) {
            let text: string = threadText;
            text = text.replace(/^\s+|\s+$/g, '');
            
            // send new thread to server
            fetch(postUrl, {
                method: 'POST',
                headers: globalObjects.globalHeader.headers,
                body: JSON.stringify({
                    text: threadText
                })
            });

            // refresh threads
            onRefresh();
            
            setThreadText('');
            setModalOpen(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Modal visible={modalOpen} transparent={true} animationType='slide'>
                <SafeAreaView style={styles.modalSafeAreaView}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => setModalOpen(false)}>
                            <Ionicons size={30} name={'arrow-back-outline'} color={'#000'} style={styles.closeIcon}/>
                        </Pressable>
                        
                        <Pressable onPress={pressSendHandler}>
                            <Text style={styles.modalHeaderText}>Absenden</Text>
                        </Pressable>
                        
                        
                    </View>

                    
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder='Deine Nachricht…'
                            onChangeText={text => setThreadText(text)}
                            multiline
                            value={threadText}
                            style={styles.inputText}
                            autoFocus={true}
                            textAlignVertical={'top'}
                        >

                        </TextInput>
                    </View>
                </SafeAreaView>
            </Modal>

            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> :
                    (<SectionList
                        sections={threads}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        renderItem={({ item }) => (<ThreadItem onPress={() => pressHandler(item)} textSnippet={item.text_snippet} date={item.date} numberOfAnswers={item.number_of_answers} />)}
                        renderSectionHeader={({ section: { title } }) => (<SectionListHeader text={title} />)}
                    />
                    )}
                <Pressable
                    style={styles.addThreadButton}
                    onPress={ () => setModalOpen(true) }>
                    <Ionicons size={60} name={'add-circle-outline'} color={'#5D5D5D'}/>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.jsvScreenBackground
    },
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