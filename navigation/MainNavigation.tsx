import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChatOverviewScreen } from '../screens/ChatOverviewScreen';
import { EventOverviewScreen } from '../screens/EventOverviewScreen';
import { NewsFeedOverviewScreen } from '../screens/NewsFeedOverviewScreen';

const Tab = createBottomTabNavigator();

export function MainNavigation() {
    return (

        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Newsfeed':
                                {
                                    iconName = focused
                                        ? 'ios-newspaper'
                                        : 'ios-newspaper-outline';
                                    break;
                                }

                            case 'Events':
                                {
                                    iconName = focused
                                        ? 'calendar'
                                        : 'calendar-outline';
                                    break;
                                }

                            case 'Chat':
                                {
                                    iconName = focused
                                        ? 'chatbubble-ellipses-sharp'
                                        : 'chatbubble-ellipses-outline';
                                    break;
                                }

                            case 'Profil':
                                {
                                    iconName = focused
                                        ? 'person-circle-sharp'
                                        : 'person-circle-outline';
                                    break;
                                }
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size * 0.85} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#129467',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Newsfeed" component={NewsFeedOverviewScreen} />
                <Tab.Screen name="Events" component={EventOverviewScreen} />
                <Tab.Screen name="Chat" component={ChatOverviewScreen} />
                <Tab.Screen name="Profil" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}