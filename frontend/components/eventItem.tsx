import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AttendanceLabel } from './attendanceLabel';
import { getTimeString, getMonthAbbreviation } from '../globalObjects/dateAndTimeFunctions';

const EventItem = ({ title, date, location, attendance_responses, onPress }) => {
    let parsedEventDate = new Date(date);
    let day = parsedEventDate.getDate();

    // get month abbreviation as string
    let monthAbbreviation = getMonthAbbreviation(parsedEventDate.getMonth());

    return (
        <Pressable onPress={onPress}>
            <View style={[globalStyles.item, styles.eventItem]}>

                <View style={styles.flexRow}>

                    <View style={styles.calendarDate}>
                        <Text style={styles.month} numberOfLines={1}>{monthAbbreviation}</Text>
                        <Text style={styles.date} numberOfLines={1}>{day}</Text>
                    </View>

                    <View style={styles.eventInfo}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <Text style={styles.timeAndLocation} numberOfLines={1}>{getTimeString(new Date(date)) + ' · ' + location}</Text>
                        <AttendanceLabel attendance_responses={attendance_responses} />
                    </View>

                </View>

            </View>
        </Pressable >
    );
}

let padding = 10;
const styles = StyleSheet.create({
    eventItem: {
        paddingLeft: 0,
        paddingRight: 0
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start' 
    },
    calendarDate: {
        width: 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#BFBFBF',
        paddingRight: padding,
        paddingLeft: padding
    },
    date: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    month: {
        fontSize: 14,
        color: '#0F6043'
    },

    eventInfo: {
        paddingLeft: 2 * padding,
        paddingRight: 2 * padding
    },
    title: {
        fontSize: 18,
        color: "#1D2026",
        fontWeight: "bold",
        marginBottom: 1
    },
    timeAndLocation: {
        fontSize: 12,
        color: "#1D2026",
        marginBottom: 4
    },
    participantInformation: {
        fontSize: 12,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default EventItem;