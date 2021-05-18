import React from 'react';
import Login from '../components/login'
import SignupScreen from '../components/signup'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const StackNavigator = createStackNavigator(
  {
    Login: { 
      screen: Login,
      navigationOptions: {
      	header: false
      }
    },
    Signup: { 
      screen: SignupScreen,
      navigationOptions: {
      	title: 'Signup'
      }
    }
  }
);

export default createAppContainer(StackNavigator);