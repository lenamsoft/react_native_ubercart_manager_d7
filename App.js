import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import AuthLoadingScreen from './src/components/screens/AuthLoadingScreen'
import HomeScreen from './src/components/screens/HomeScreen'
import OtherScreen from './src/components/screens/OtherScreen'
import SignInScreen from './src/components/screens/SignInScreen'


const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));


