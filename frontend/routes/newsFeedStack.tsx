import { createStackNavigator } from 'react-navigation-stack';
import { NewsFeedOverview } from '../screens/newsFeedOverview';
import { NewsArticle } from '../screens/newsArticle';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

// Define stack navigator screens for news feed.
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

// Construct stack navigator for news feed based on defined screens.
const NewsFeedStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTitleStyle: globalStyles.screenHeader,
        headerTintColor: colors.jsvScreenHeaderText,
        headerTitleAlign: 'left',
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default NewsFeedStack;