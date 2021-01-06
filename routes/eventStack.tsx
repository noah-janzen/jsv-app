import { createStackNavigator } from 'react-navigation-stack';
import { EventDetails } from '../screens/eventDetails';
import { EventOverview } from '../screens/eventOverview';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

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

const EventStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTitleStyle: globalStyles.screenHeader,
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default EventStack;