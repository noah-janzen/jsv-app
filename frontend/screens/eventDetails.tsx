import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ScrollView, Button, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationText from '../components/locationText';
import DateAndTimeText from '../components/dateAndTimeText';
import EventTypeText from '../components/eventTypeText';
import ParticipationInformation from '../components/participationInformation';
import { AttendanceLabel } from '../components/attendanceLabel';
import { EventInfoListPoint } from '../components/eventInfoListPoint';
import createDateTimeString from '../globalObjects/createDateTimeString';
import globalObjects from '../globalObjects/globalObjects';
import { PostAttendanceButton } from '../components/postAttendanceButton';

export function EventDetails({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [event, setEvent] = useState({ id: "0", title: "", date: "", location: "", attendance_responses: { yes: 0, no: 0, not_sure: 0 }, public: "", description: "", imgURI: "" });
    const [refreshing, setRefreshing] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState(undefined);

    let requestUrl = globalObjects.serverURL + '/event/' + navigation.getParam('id');

    // load initially the news events from server
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setEvent(json.event))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // pull to refresh function
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setEvent(json.event))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    // update attendance
    const updateAttendanceStatusHandler = (newAttendanceStatus: string) => {
        console.log('update attendance ' + newAttendanceStatus);

        // attendance status is changed
        if (attendanceStatus != undefined && attendanceStatus != newAttendanceStatus) {
            // remove old status
            event.attendance_responses[attendanceStatus] -= 1;
        }
        // 
        if (attendanceStatus != newAttendanceStatus) {
            event.attendance_responses[newAttendanceStatus] += 1;
        }

        setAttendanceStatus(newAttendanceStatus);


    }

    return (
        <SafeAreaView style={styles.container}>

            {isLoading ? <ActivityIndicator /> : (

                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <ImageBackground source={{ uri: event.imgURI }} style={styles.img}></ImageBackground>

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{event.title}</Text>



                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>KURZINFOS</Text>
                            <EventInfoListPoint
                                symbolName={'calendar'}
                                text={createDateTimeString(new Date(event.date))} />
                            <EventInfoListPoint
                                symbolName={'location-sharp'}
                                text={event.location} />
                            <EventInfoListPoint
                                symbolName={'eye'}
                                text={event.public} />

                        </View>

                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>TEILNAHME</Text>
                            <AttendanceLabel attendance_responses={event.attendance_responses} />

                        </View>

                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>BESCHREIBUNG</Text>
                            <Text style={styles.description}>{event.description}</Text>
                        </View>
                    </View>
                </ScrollView>)}


            <View style={styles.buttonContainer}>
                <PostAttendanceButton
                    labelText={'Zusage'}
                    pressHandler={updateAttendanceStatusHandler}
                    attendanceStatus={'yes'}
                    bgColor={'#27AE60'} />
                <PostAttendanceButton
                    labelText={'Absage'}
                    pressHandler={updateAttendanceStatusHandler}
                    attendanceStatus={'no'}
                    bgColor={'#C0392B'} />
                <PostAttendanceButton
                    labelText={'Weiß nicht'}
                    pressHandler={updateAttendanceStatusHandler}
                    attendanceStatus={'not_sure'}
                    bgColor={'#F39C12'} />
            </View>


        </SafeAreaView>
    )
}

const padding = 16;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        height: 200,
        marginBottom: 20
    },
    title: {
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
    description: {
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    }
})