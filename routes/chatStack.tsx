import { createStackNavigator } from 'react-navigation-stack';
import { ChatOverview } from '../screens/chatOverview';
import { Thread } from '../screens/thread';

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

const ChatStack = createStackNavigator(screens);

export default ChatStack;