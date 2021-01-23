import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList, RefreshControl } from 'react-native';
import EventItem from '../components/eventItem';
import SectionListHeader from '../components/sectionListHeader';
import createDateTimeString from '../globalObjects/createDateTimeString';
import globalObjects from '../globalObjects/globalObjects';
import colors from '../styles/colors';

export function EventOverview({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [eventsByMonth, setEventsByMonth] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    let requestUrl = globalObjects.serverURL + '/event-overview';

    //fetchEventOverviewList();

    // load initially the news events from server
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setEventsByMonth(json.events_by_month))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const pressHandler = (item) => {
        navigation.navigate('EventDetails', item);
    }

    // pull to refresh function
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            let response = await fetch(requestUrl);
            let json = await response.json();
            setEventsByMonth(json.events_by_month);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    }, [refreshing]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : (
                    <SectionList
                        sections={eventsByMonth}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        renderItem={({ item }) =>
                            <EventItem
                                onPress={() => pressHandler(item)}
                                title={item.title}
                                date={item.date}
                                location={item.location}
                                attendance_responses={item.attendance_responses}
                                id={item.id}
                            />
                        }
                        renderSectionHeader={({ section: { title } }) => (<SectionListHeader text={title} />)}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.jsvScreenBackground
    }
});