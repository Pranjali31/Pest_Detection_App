import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './Loginpage';
import RegisterScreen from './Registerpage';
import HomePage from './Homepage';
import CaptureScreen from './Capture';
import PreviewScreen from './Preview';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    Capture: {
      screen: CaptureScreen,
      navigationOptions: {
        headerTitle: 'Capture',
      },
    },
    Preview: {
      screen: PreviewScreen,
      navigationOptions: {
        headerTitle: 'Preview',
      },
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default AppNavigator;
