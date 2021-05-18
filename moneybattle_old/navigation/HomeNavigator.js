import React from 'react';
import { Ionicons } from '@expo/vector-icons'
// import LoginScreen from '../components/login'
import HomeScreen from '../components/home';
// import SearchScreen from '../screens/Search'
// import PostScreen from '../screens/Post'
// import ActivityScreen from '../screens/Activity'
// import ProfileScreen from '../screens/Profile'
// import CameraScreen from '../screens/Camera'
// import ImageUploader from '../screens/ImageUploader';
import { createAppContainer } from 'react-navigation';
import { TouchableOpacity, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';

export const HomeNavigator = createAppContainer(createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={{width: 120, height: 35}} source={require('../assets/logo.jpg')} />,
        headerShown: false
        // headerLeft: (
        //   <TouchableOpacity onPress={() => navigation.navigate('Camera')} >
        //     <Ionicons style={{marginLeft: 10}} name={'ios-camera'} size={30}/>
        //   </TouchableOpacity>
        // ),
        // headerRight: (
        //   <TouchableOpacity onPress={() => console.log('Message')} >
        //     <Ionicons style={{marginRight: 10}} name={'ios-send'} size={30}/>
        //   </TouchableOpacity>
        // ),
      })
    },
    // Login: { 
    //   screen: LoginScreen,
    //   navigationOptions: {
    //     header: null
    //   }
    // }
  }
));

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
//   if (navigation.state.routes.some(route => route.routeName === 'Login')) {
//     tabBarVisible = false
//   }
  return {
    tabBarVisible,
  }
}

// export const SearchNavigator = createAppContainer(createStackNavigator(
//   {
//     Search: { 
//       screen: SearchScreen,
//       navigationOptions: {
//         title: 'Search'
//       }
//     }
//   }
// ));

// export const PostNavigator = createAppContainer(createStackNavigator(
//   {
//     Post: { 
//       screen: PostScreen,
//       navigationOptions: {
//         title: 'Post'
//       }
//     }
//   }
// ));

// export const ActivityNavigator = createAppContainer(createStackNavigator(
//   {
//     Activity: { 
//       screen: ActivityScreen,
//       navigationOptions: {
//         title: 'Activity'
//       }
//     }
//   }
// ));

// export const ProfileNavigator = createAppContainer(createStackNavigator(
//   {
//     Profile: { 
//       screen: ProfileScreen,
//       navigationOptions: {
//         title: 'Profile'
//       }
//     }
//   }
// ));