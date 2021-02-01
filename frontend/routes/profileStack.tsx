import { createStackNavigator } from 'react-navigation-stack';
import { ProfileOverview } from '../screens/profileOverview';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

// Define stack navigator screens for profile.
const screens = {
    Profile: {
        screen: ProfileOverview,
        navigationOptions: {
            title: 'Profil'
        }
    }
}

// Construct stack navigator for profile based on defined screens.
const ProfileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTitleStyle: globalStyles.screenHeader,
        headerTintColor: colors.jsvScreenHeaderText,
        headerTitleAlign: 'left',
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default ProfileStack;