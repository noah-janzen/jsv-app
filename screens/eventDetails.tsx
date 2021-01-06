import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ScrollView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationText from '../components/locationText';
import DateAndTimeText from '../components/dateAndTimeText';
import EventTypeText from '../components/eventTypeText';
import ParticipationInformation from '../components/participationInformation';

export function EventDetails({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ImageBackground source={{ uri: navigation.getParam('imgURI') }} style={styles.img}></ImageBackground>

                <Text style={styles.title}>{navigation.getParam('title')}</Text>

                <View style={styles.subSection}>
                    <Text style={styles.subTitle}>KURZINFOS</Text>
                    <DateAndTimeText date={'22.10.2021'} time={'16:00'} />
                    <LocationText location={navigation.getParam('location')} />
                    <EventTypeText isInternalEvent={navigation.getParam('isInternalEvent')} />
                    <ParticipationInformation
                        numberAcceptances={navigation.getParam('numberAcceptances')}
                        numberRefusals={navigation.getParam('numberRefusals')}
                        numberPossibly={navigation.getParam('numberPossibly')}
                    />
                </View>

                <View style={styles.subSection}>
                    <Text style={styles.subTitle}>BESCHREIBUNG</Text>
                    <Text style={styles.description}>Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. Lorem ipsum dolor in magnis doro. </Text>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button color='#bababa' title='Zusagen' />
                <Button color='#bababa' title='Absagen' />
                <Button color='#bababa' title='Vielleicht' />
            </View>
        </SafeAreaView>
    )
}

const padding = 16;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: padding
    },
    subSection: {
        marginBottom: 25,
        marginLeft: 16
    },
    subTitle: {
        color: '#7a7777',
        marginBottom: 10,
        fontSize: 16
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
    img: {
        height: 200
    },
    button: {
        backgroundColor: 'gray'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})