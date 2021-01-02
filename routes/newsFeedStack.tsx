import { createStackNavigator } from 'react-navigation-stack';
import { NewsFeedOverview } from '../screens/newsFeedOverview';
import { NewsArticle } from '../screens/newsArticle';

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

const NewsFeedStack = createStackNavigator(screens);

export default NewsFeedStack;