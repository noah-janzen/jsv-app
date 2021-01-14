import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import ParticipationInformation from './participationInformation';
import globalStyles from '../styles/globalStyles';

const EventItem = ({ title, date, month, time, location, numberAcceptances, numberRefusals, numberPossibly, imgURI, isInternalEvent, description, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={globalStyles.item}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                    <View style={styles.calendarDate}>
                        <Text style={styles.month}>{month}</Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>

                    <View style={styles.eventInfo}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.timeAndLocation}>{time} · {location}</Text>
                        <ParticipationInformation numberAcceptances={numberAcceptances} numberRefusals={numberRefusals} numberPossibly={numberPossibly} />
                    </View>

                </View>

            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    date: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    month: {
        fontSize: 14
    },
    calendarDate: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        marginRight: 10
    },
    eventInfo: {
        marginLeft: 10
    },
    title: {
        fontSize: 18,
        color: "#1D2026",
        fontWeight: "bold",
        marginBottom: 3
    },
    timeAndLocation: {
        fontSize: 12,
        color: "#1D2026",
        marginBottom: 3
    },
    participantInformation: {
        fontSize: 12,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default EventItem;