import { createAppContainer } from 'react-navigation';
import NewsFeedStack from './newsFeedStack';
import EventStack from './eventStack';
import ChatStack from './chatStack';
import ProfileStack from './profileStack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import React from 'react';

const tabs = {
    Newsfeed: {
        screen: NewsFeedStack,
        navigationOptions: {
            tabBarLabel: 'Newsfeed',
            tabBarIcon: () => (
                <View>
                    <Ionicons style={[{ color: 'black' }]} size={25} name={'ios-newspaper'} />
                </View>),
        }
    },
    Events: {
        screen: EventStack,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: () => (
                <View>
                    <Ionicons style={[{ color: 'black' }]} size={25} name={'calendar'} />
                </View>),
        }
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: () => (
                <View>
                    <Ionicons style={[{ color: 'black' }]} size={25} name={'chatbubble-ellipses-sharp'} />
                </View>),
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profil',
            tabBarIcon: () => (
                <View>
                    <Ionicons style={[{ color: 'black' }]} size={25} name={'person-circle-sharp'} />
                </View>),
        }
    }
}

const RootTabNavigator = createMaterialBottomTabNavigator(tabs, {
    initialRouteName: 'Newsfeed',
    activeColor: 'black',
    inactiveColor: 'yellow',
    barStyle: { backgroundColor: '#129467' }
});

export default createAppContainer(RootTabNavigator);