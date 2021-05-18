import React, {useDebugValue, useEffect, useState} from 'react'
import { StatusBar } from 'react-native';
import { Text, View, ScrollView, StyleSheet, Platform, Animated, Image } from 'react-native';
import { Button } from 'react-native-paper';
import {combineReducers, createStore} from 'redux';
import { Provider } from 'react-redux';
import playerReducer from './store/reducers/player';
import opponentReducer from './store/reducers/opponent';
import gameReducer from './store/reducers/game';
import userReducer from './store/reducers/user';
import Constants from 'expo-constants'
import SwitchNavigator from './navigation/switchnavigator';

// or any pure javascript modules available in npm
const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
  opponent: opponentReducer,
  user: userReducer
});
const store = createStore(rootReducer);

export default function App() { 
  return (
    <Provider store={store}>
      	<SwitchNavigator/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  gradient: { 
    top: 250,
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems:'center'
  },
  container: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#F3F3F3',
    backgroundColor: 'black',
    color: 'white',
    // paddingBottom: 60,
    // display: 'flex',
    paddingTop: Platform.OS == 'ios' ? Constants.statusBarHeight : null,
  },
  avatar: {
    position: 'absolute',
     top: 200
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    resizeMode: "stretch",
    // justifyContent: "center"
    // opacity: 0.3
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  buttonStart: {
    // width: '100%',
    // height: '100%',
    justifyContent:'center',
    alignItems:'center',
  overflow: 'visible',
  // backgroundColor: 'transparent'
    // backgroundColor: 'white'
  },
  buttonReset: {
    justifyContent:'center',
    alignItems:'center',
  overflow: 'visible',
  },
  timerCompContainer: {
    position: 'absolute',
    // right: 100,
    // height: 50,
    flex: 1,
    top: 30,
    // left: '50%',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems:'center',
    width: '100%',


  },
  timerComp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#191919',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20
  },
  timerInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#EC3750'
  },
  timerText: {
    color: '#EC3750'
  },
  timerValue: {
      fontSize: 40,
      color: '#EC3750'
  },
  diceContainer: {
    position: 'absolute',
    top: 150, 
    borderRadius: 40,
    overflow: 'hidden'
  },
  diceInnerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    width: 190,
    height: 190,
  },
  rollingDiceContainer: {
    position: 'absolute',
    top: 150, 
    borderRadius: 40,
    overflow: 'hidden'
  },
  rollingDiceInnerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    width: 190,
    height: 190,
  },
  bubbleContainer: {
    position: 'absolute',
    top: -40, 
    left: 250,
  },
  bubbleInnerContainer: {
    position: 'relative',
    // width: '100%',
    // height: '100%',
    width: 110,
    height: 110,
    // padding: 10,
    // backgroundColor: 'white'
  },
  bubbleImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    resizeMode: 'stretch',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  bubbleText: {
    position: 'absolute',
    top:90,
    left: 10
  },
  playAreaComp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 300,
    top: 200
  },
  coinContainer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 5
  },
  coinInnerContainer: {
    position: 'relative',
    // width: '100%',
    // height: '100%',
    width: 50,
    height: 50,
    // padding: 10,
    // backgroundColor: 'white'
  },
  coinImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    resizeMode: 'stretch',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  coinTextContainer: {
    marginLeft: 10
  },
  coinText: {
    fontSize: 20,
    color: 'red'
  }
})
