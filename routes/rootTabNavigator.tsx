import { createAppContainer } from 'react-navigation';
import NewsFeedStack from './newsFeedStack';
import EventStack from './eventStack';
import ChatStack from './chatStack';
import ProfileStack from './profileStack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import React from 'react';
import colors from '../styles/colors';

const tabs = {
    Newsfeed: {
        screen: NewsFeedStack,
        navigationOptions: {
            tabBarLabel: 'Newsfeed',
            tabBarIcon: ({ tintColor }) => (<Ionicons size={25} name={'ios-newspaper'} color={tintColor} />)
        }
    },
    Events: {
        screen: EventStack,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor }) => (<Ionicons size={25} name={'calendar'} color={tintColor} />)
        }
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({ tintColor }) => (<Ionicons size={25} name={'chatbubble-ellipses-sharp'} color={tintColor} />)
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profil',
            tabBarIcon: ({ tintColor }) => (<Ionicons size={25} name={'person-circle-sharp'} color={tintColor} />)
        }
    }
}

const RootTabNavigator = createBottomTabNavigator(tabs, {
    tabBarOptions: {
        activeTintColor: colors.jsvTabNavigatorActiveTab,
        inactiveTintColor: colors.jsvTabNavigatorInactiveTab,
        style: {
            backgroundColor: colors.jsvTabNavigatorBackground
        }
    }
});

export default createAppContainer(RootTabNavigator);