import { createStackNavigator } from 'react-navigation-stack';
import { ProfileOverview } from '../screens/profileOverview';
import { Imprint } from '../screens/imprint';
import colors from '../styles/colors';

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
        headerStyle: {
            backgroundColor: colors.jsvMainGreen
        }
    }
});

export default ProfileStack;