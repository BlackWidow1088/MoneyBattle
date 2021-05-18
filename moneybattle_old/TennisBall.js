import React, { Component, useEffect } from 'react';
import { Animated, TouchableWithoutFeedback, Text, View, StyleSheet, Easing, Image } from 'react-native';
import { Button } from 'react-native-paper';
import rollingDice from './assets/rollingDice.gif';
const TennisBall = (props) => {
    let moveAnimation= new Animated.ValueXY({ x: 200, y: 180 });;
  useEffect(() => {
      if(props.resetAnimation > 0) {
        Animated.spring(moveAnimation, {
            toValue: {x: 430, y: 60},
            // useNativeDriver: true,
          }).start()
      }

  }, [props.resetAnimation]);
  const _moveBall = () => {
      Animated.sequence([
        Animated.timing(moveAnimation, {
            toValue: {x: 400, y: 180},
            easing: Easing.back(),
            duration: 1000,
          //   useNativeDriver: true,
          }),
          Animated.timing(moveAnimation, {
            toValue: {x: 400, y: 100},
            easing: Easing.back(),
            duration: 300,
          }),
          Animated.timing(moveAnimation, {
            toValue: {x: 400, y: 180},
            easing: Easing.bounce,
            duration: 600,
          }),
      ]).start();
  }

  return (
      <>
      
             <View style={styles.container}>
     
      {
          moveAnimation &&
          <Animated.View style={[styles.tennisBall, moveAnimation.getLayout()]}>
          <TouchableWithoutFeedback style={styles.button} onPress={_moveBall}>
          <View style={styles.rollingDiceInnerContainer}>
            <Image source={rollingDice} style={styles.bubbleImage}/>
          </View>
            {/* <Text style={styles.buttonText}>Press</Text> */}
          </TouchableWithoutFeedback>        
        </Animated.View>
      }

    </View>
      </>

  );
}
export default TennisBall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'greenyellow',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  buttonStart: {
    width: '100%',
    height: '100%',
    justifyContent:'center',
    alignItems:'center',
  overflow: 'visible',
  // backgroundColor: 'transparent'
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
  rollingDiceInnerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    width: 190,
    height: 190,
  },
});