import { createStackNavigator } from 'react-navigation-stack';
import { ProfileOverview } from '../screens/profileOverview';
import { Imprint } from '../screens/imprint';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

const screens = {
    Profile: {
        screen: ProfileOverview,
        navigationOptions: {
            title: 'Profil'
        }
    },
    Imprint: {
        screen: Imprint,
        navigationOptions: {
            title: 'Impressum'
        }
    }
}

const ProfileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTitleStyle: globalStyles.screenHeader,
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default ProfileStack;