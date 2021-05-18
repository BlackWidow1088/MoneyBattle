import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
// import Button from './button'
import { useSelector } from 'react-redux';
import {diceGenerator} from './lib/randomNumberGenerator'

export default function Comp() {
  // const [statearr, setStatearr] = React.useState([2, 5])
  const diceValues = useSelector(state => state.game.diceValues);
  console.log('dicevalues inside', diceValues);
  return (
    <>
      <View>
        <View style={styles.diceContainer}>
          <Image
            source={dicearr[diceValues[0]-1]}
            style={{ width: 80, height: 80, marginHorizontal: 15 }}
          />
          <Image
            source={dicearr[diceValues[1]-1]}
            style={{ width: 80, height: 80, marginHorizontal: 15 }}
          />
        </View>

        {/* <View style={styles.buttonContainer}> */}
          {/* <Button
            title='Roll'
            onPress={function () {
              setStatearr(diceValues)
            }}
          /> */}
        {/* </View> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  diceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
  },
})

const dicearr = [
  require('../assets/dice/dice-1.png'),
  require('../assets/dice/dice-2.png'),
  require('../assets/dice/dice-3.png'),
  require('../assets/dice/dice-4.png'),
  require('../assets/dice/dice-5.png'),
  require('../assets/dice/dice-6.png'),
]
