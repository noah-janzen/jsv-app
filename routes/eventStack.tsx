import { createStackNavigator } from 'react-navigation-stack';
import { EventDetails } from '../screens/eventDetails';
import { EventOverview } from '../screens/eventOverview';

const screens = {
    Events: {
        screen: EventOverview,
        navigationOptions: {
            title: 'Events'
        }
    },
    EventDetails: {
        screen: EventDetails,
        navigationOptions: {
            title: ''
        }
    }
}

const EventStack = createStackNavigator(screens);

export default EventStack;