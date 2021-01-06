import { createStackNavigator } from 'react-navigation-stack';
import { NewsFeedOverview } from '../screens/newsFeedOverview';
import { NewsArticle } from '../screens/newsArticle';
import colors from '../styles/colors';

const screens = {
    Newsfeed: {
        screen: NewsFeedOverview,
        navigationOptions: {
            title: 'Newsfeed'
        }
    },
    NewsArticle: {
        screen: NewsArticle,
        navigationOptions: {
            title: ''
        }
    }
}

const NewsFeedStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default NewsFeedStack;