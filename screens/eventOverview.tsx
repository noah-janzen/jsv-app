import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList } from 'react-native';
import EventItem from '../components/eventItem';
import SectionListHeader from '../components/sectionListHeader';
import globalObjects from '../globalObjects/globalObjects';
import colors from '../styles/colors';

export function EventOverview({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [events_by_month, setEvents_by_month] = useState([]);

    let requestUrl = globalObjects.serverURL + '/event-overview';

    useEffect(() => {
        fetch(requestUrl, globalObjects.globalHeader)
            .then((response) => response.json())
            .then((json) => setEvents_by_month(json.events_by_month))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    console.log(events_by_month);

    const pressHandler = (item) => {
        navigation.navigate('EventDetails', item);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : (
                    <SectionList
                        sections={events_by_month}
                        renderItem={({ item }) =>
                            <EventItem
                                onPress={() => pressHandler(item)}
                                title={item.title}
                                date={item.date}
                                location={item.location}
                                attendance_responses={item.attendance_responses}
                            />
                        }
                        renderSectionHeader={({ section: { year_month } }) => (<SectionListHeader text={year_month} />)}
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