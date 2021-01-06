import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList } from 'react-native';
import EventItem from '../components/eventItem';

export function EventOverview({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([
        {
            title: 'Januar',
            data: [
                { title: 'Veranstaltungstitel 1', date: 12, month: 'JAN', time: '08:00', location: 'Osterfeuerwiese 1', numberAcceptances: 10, numberRefusals: 5, numberPossibly: 12, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 1 },
                { title: 'Veranstaltungstitel 2', date: 14, month: 'JAN', time: '10:00', location: 'Schützenwiese', numberAcceptances: 20, numberRefusals: 15, numberPossibly: 1, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: false, description: 'Lorem ipsum dolor magnis in dorom.', key: 2 },
            ]
        },
        {
            title: 'Februar',
            data: [
                { title: 'Veranstaltungstitel 3', date: 2, month: 'FEB', time: '12:00', location: 'Osterfeuerwiese 1', numberAcceptances: 10, numberRefusals: 5, numberPossibly: 12, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 3 },
                { title: 'Veranstaltungstitel 4', date: 25, month: 'FEB', time: '19:00', location: 'Schützenwiese', numberAcceptances: 20, numberRefusals: 15, numberPossibly: 1, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 4 },
            ]
        },
        {
            title: 'März',
            data: [
                { title: 'Veranstaltungstitel 5', date: 12, month: 'MÄR', time: '13:00', location: 'Osterfeuerwiese 1', numberAcceptances: 10, numberRefusals: 5, numberPossibly: 12, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: false, description: 'Lorem ipsum dolor magnis in dorom.', key: 5 },
            ]
        },
        {
            title: 'April',
            data: [
                { title: 'Veranstaltungstitel 6', date: 1, month: 'APR', time: '11:30', location: 'Osterfeuerwiese 1', numberAcceptances: 10, numberRefusals: 5, numberPossibly: 12, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: false, description: 'Lorem ipsum dolor magnis in dorom.', key: 6 },
                { title: 'Veranstaltungstitel 7', date: 3, month: 'APR', time: '11:45', location: 'Schützenwiese', numberAcceptances: 20, numberRefusals: 15, numberPossibly: 1, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: false, description: 'Lorem ipsum dolor magnis in dorom.', key: 7 },
                { title: 'Veranstaltungstitel 8', date: 7, month: 'APR', time: '20:00', location: 'Schützenwiese', numberAcceptances: 20, numberRefusals: 15, numberPossibly: 1, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 8 },
            ]
        },
        {
            title: 'Mai',
            data: [
                { title: 'Veranstaltungstitel 9', date: 12, month: 'MAI', time: '14:00', location: 'Osterfeuerwiese 1', numberAcceptances: 10, numberRefusals: 5, numberPossibly: 12, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 9 },
            ]
        },
        {
            title: 'Juni',
            data: [
                { title: 'Veranstaltungstitel 10', date: 12, month: 'JUN', time: '12:00', location: 'Osterfeuerwiese 1', numberAcceptances: 10, numberRefusals: 5, numberPossibly: 12, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: false, description: 'Lorem ipsum dolor magnis in dorom.', key: 10 },
                { title: 'Veranstaltungstitel 11', date: 15, month: 'JUN', time: '17:00', location: 'Schützenwiese', numberAcceptances: 20, numberRefusals: 15, numberPossibly: 1, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 11 },
                { title: 'Veranstaltungstitel 12', date: 21, month: 'JUN', time: '12:00', location: 'Schützenwiese', numberAcceptances: 20, numberRefusals: 15, numberPossibly: 1, imgURI: 'https://www.jsv-huenxe.de/wp-content/uploads/2019/08/Thron-2019-Oberlohberg-624x468.jpg', isInternalEvent: true, description: 'Lorem ipsum dolor magnis in dorom.', key: 12 },
            ]
        }
    ]);

    const pressHandler = (item) => {
        navigation.navigate('EventDetails', item);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : (
                    <SectionList
                        sections={data}
                        renderItem={({ item }) =>
                            <EventItem
                                onPress={() => pressHandler(item)}
                                title={item.title}
                                date={item.date}
                                month={item.month}
                                time={item.time}
                                location={item.location}
                                numberAcceptances={item.numberAcceptances}
                                numberRefusals={item.numberRefusals}
                                numberPossibly={item.numberPossibly}
                                imgURI={item.imgURI}
                                isInternalEvent={item.isInternalEvent}
                                description={item.description} />}
                        renderSectionHeader={({ section: { title } }) =>
                            (<View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>{title}</Text>
                            </View>
                            )
                        }
                    />)}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d5d5d5"
    },
    sectionHeader: {
        backgroundColor: '#d5d5d5',
        padding: 20
    },
    sectionHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    }
});