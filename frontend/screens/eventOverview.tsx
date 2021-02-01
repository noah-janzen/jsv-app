import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, SafeAreaView, SectionList, RefreshControl } from 'react-native';
import EventItem from '../components/eventItem';
import SectionListHeader from '../components/sectionListHeader';
import { EventSectionListFactory } from '../globalObjects/eventSectionListFactory';
import globalObjects from '../globalObjects/globalObjects';
import globalStyles from '../styles/globalStyles';

export function EventOverview({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [eventsByMonth, setEventsByMonth] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    let requestUrl = globalObjects.serverURL + '/events';

    // initially load the event list items
    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then(json => json.eventListItems)
            .then(eventListItemRawArray => EventSectionListFactory.fromEventListItemRawArray(eventListItemRawArray))
            .then(eventListItemArray => EventSectionListFactory.toSectionList(eventListItemArray))
            .then(eventSectionListItems => setEventsByMonth(eventSectionListItems))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // refresh the event list items
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then(json => json.eventListItems)
            .then(eventListItemRawArray => EventSectionListFactory.fromEventListItemRawArray(eventListItemRawArray))
            .then(eventListItemArray => EventSectionListFactory.toSectionList(eventListItemArray))
            .then(eventSectionListItems => setEventsByMonth(eventSectionListItems))
            .catch((error) => console.error(error))
            .finally(() => setRefreshing(false));
    }, []);

    // navigates to event details view
    const pressHandler = (item) => {
        navigation.navigate('EventDetails', item);
    }

    return (
        <SafeAreaView style={globalStyles.flex}>
            <View style={globalStyles.container}>
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
                            />
                        }
                        renderSectionHeader={({ section: { title } }) => (<SectionListHeader text={title} />)}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
