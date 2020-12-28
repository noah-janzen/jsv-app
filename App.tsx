import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

function NewsFeedOverviewScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>News feed!</Text>
    </View>
  );
}

function EventOverviewScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Events!</Text>
    </View>
  );
}

function ChatOverviewScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profil!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
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

              case 'Profile':
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
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
