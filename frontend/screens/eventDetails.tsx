import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ScrollView, Button, RefreshControl, ActivityIndicator } from 'react-native';
import { AttendanceLabel } from '../components/attendanceLabel';
import { EventInfoListPoint } from '../components/eventInfoListPoint';
import globalObjects from '../globalObjects/globalObjects';
import { PostAttendanceButton } from '../components/postAttendanceButton';
import { getDateTimeString } from '../globalObjects/dateAndTimeFunctions';
import { getData, storeData } from '../globalObjects/storageFunctions';
import globalStyles from '../styles/globalStyles';

export function EventDetails({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [event, setEvent] = useState({ id: "0", title: "", date: "", location: "", attendance_responses: { yes: 0, no: 0, not_sure: 0 }, public: "", description: "", imgURI: "../assets/jsv-img.png" });
    const [isRefreshing, setRefreshing] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState('');

    let requestUrl = globalObjects.serverURL + '/events/' + navigation.getParam('id');
    let postUrl = globalObjects.serverURL + '/events/' + navigation.getParam('id') + '/attendance';

    // initially load the event
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setEvent(json.event))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        
        // get individual attendance status of user from local storage and save in state
        getData(navigation.getParam('id'))
            .then(attendanceStatus => setAttendanceStatus(attendanceStatus));
    }, []);

    // refresh the event
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setEvent(json.event))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    // update individual attendance status of user
    const updateAttendanceStatusHandler = (newAttendanceStatus: string) => {
        // no new attendance status: return
        if(attendanceStatus === newAttendanceStatus) {
            return;
        }

        // new attendance status: post new attendance status to server and store new attendance status locally
        let old_attendance = attendanceStatus;

        fetch(postUrl, {
            method: 'POST',
            headers: globalObjects.globalHeader.headers,
            body: JSON.stringify({
                attendance: newAttendanceStatus,
                old_attendance: old_attendance === '' ? undefined : old_attendance
            })
        })
            .then(() => {
                setAttendanceStatus(newAttendanceStatus);
                storeData(navigation.getParam('id'), newAttendanceStatus);
            })
            .finally(() => onRefresh());
    }

    return (
        <SafeAreaView style={globalStyles.flex}>

            {isLoading ? <ActivityIndicator /> : (

                /* Information about the event */
                <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                    <ImageBackground source={{ uri: event.imgURI }} style={styles.eventImage}></ImageBackground>

                    <View style={styles.contentContainer}>
                        <Text style={styles.eventTitle}>{event.title}</Text>

                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>Kurzinfos</Text>
                            <EventInfoListPoint
                                symbolName={'calendar'}
                                text={getDateTimeString(new Date(event.date))} />
                            <EventInfoListPoint
                                symbolName={'location-sharp'}
                                text={event.location} />
                            <EventInfoListPoint
                                symbolName={'eye'}
                                text={event.public} />
                        </View>

                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>Teilnahme</Text>
                            <AttendanceLabel attendance_responses={event.attendance_responses} />

                        </View>

                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>Beschreibung</Text>
                            <Text style={styles.eventDescription}>{event.description}</Text>
                        </View>
                    </View>
                </ScrollView>)}

            { /* Buttons to answer individual attendance status at the bottom of the screen */ }
            <View style={styles.attendanceButtonsContainer}>
                <PostAttendanceButton
                    labelText={'Zusage'}
                    pressHandler={updateAttendanceStatusHandler}
                    attendanceStatus={'yes'}
                    bgColor={'#27AE60'}
                    isSelected={attendanceStatus === 'yes'} />
                <PostAttendanceButton
                    labelText={'Absage'}
                    pressHandler={updateAttendanceStatusHandler}
                    attendanceStatus={'no'}
                    bgColor={'#C0392B'}
                    isSelected={attendanceStatus === 'no'} />
                <PostAttendanceButton
                    labelText={'Weiß nicht'}
                    pressHandler={updateAttendanceStatusHandler}
                    attendanceStatus={'not_sure'}
                    bgColor={'#F39C12'}
                    isSelected={attendanceStatus === 'not_sure'} />
            </View>


        </SafeAreaView>
    )
}

const padding = 16;

const styles = StyleSheet.create({
    eventImage: {
        height: 200,
        marginBottom: 20
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 15
    },
    contentContainer: {
        marginLeft: padding,
        marginRight: padding
    },
    subSection: {
        marginBottom: 25
    },
    subTitle: {
        color: '#7a7777',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 12,
        marginBottom: 6
    },
    participantInformation: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 12,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    eventDescription: {
        fontSize: 16
    },
    attendanceButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    }
})