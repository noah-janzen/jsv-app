import { createStackNavigator } from 'react-navigation-stack';
import { EventDetails } from '../screens/eventDetails';
import { EventOverview } from '../screens/eventOverview';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

// Define stack navigator screens for event.
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

// Construct stack navigator for events based on defined screens.
const EventStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTitleStyle: globalStyles.screenHeader,
        headerTintColor: colors.jsvScreenHeaderText,
        headerTitleAlign: 'left',
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default EventStack;