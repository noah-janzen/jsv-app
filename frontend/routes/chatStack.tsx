import { createStackNavigator } from 'react-navigation-stack';
import { ChatOverview } from '../screens/chatOverview';
import { Thread } from '../screens/thread';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

const screens = {
    Chat: {
        screen: ChatOverview,
        navigationOptions: {
            title: 'Chat'
        }
    },
    Thread: {
        screen: Thread,
        navigationOptions: {
            title: ''
        }
    }
}

const ChatStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTitleStyle: globalStyles.screenHeader,
        headerTintColor: colors.jsvScreenHeaderText,
        headerTitleAlign: 'left',
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default ChatStack;