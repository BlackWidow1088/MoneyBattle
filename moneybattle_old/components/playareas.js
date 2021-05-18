import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Button } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {saveOpponent, assignPlayAreaToOpponent} from '../store/actions/opponent';
import {assignPlayAreaToPlayer, saveLoggedInPlayer} from '../store/actions/player';
import { rollDice} from '../store/actions/game';
import { random } from './lib/randomNumberGenerator';
import SingleArea from './singlearea';

export default function Comp({ title }) {
  useEffect(() => {
    dispatch(saveLoggedInPlayer({
      id: 1, name: 'Abhijeet', emailId: 'chavan.abhijeet1088@gmail.com',
      coins: 500, gamesTimeline: [], transactionTimeline: []
    }));
  }, [])
    const opponentSlot = useSelector(state => state.opponent.playAreaSlot);
    const playerSlot = useSelector(state => state.player.playAreaSlot);
    const player = useSelector(state => state.player.loggedInPlayer); 
    const opponent = useSelector(state => state.opponent.loggedInPlayer);
    const diceValues = useSelector(state => state.game.diceValues);
    const dispatch = useDispatch();
    const [gameStart, setGameStart] = useState(false);
    const [isSelectionAvailable, setIsSelectionAvailable] = useState(false);
    const [searchingPlayer, setSearchingPlayer] = useState(false);
    const [currentTimer, setCurrentTimer] = useState(1);
    useEffect(() => {
      endGame();
    }, [diceValues])
  const onStartGame = () => {
    console.log('staring game')
    setGameStart(true);
    if(!searchingPlayer) {
        searchPlayer();
    }

  }
  const searchPlayer = () => {
      setSearchingPlayer(true);
      setTimeout(() => {
        let randomId=  random(2,10);
        dispatch(saveOpponent({
            name: `user${randomId}`,
            id: randomId,
            email: `user${randomId}@gmail.com`
        }));
        dispatch(assignPlayAreaToOpponent(random(1,3)));
        dispatch(assignPlayAreaToPlayer(random(1,3)));

        setCurrentTimer(currentTimer+1);
        setSearchingPlayer(false);
        setIsSelectionAvailable(true);
      }, 2000)
  }
  const init = () => {
    setGameStart(false);
    setIsSelectionAvailable(false);
    setSearchingPlayer(false);
  }
  const endGame = () => {
      if(diceValues.length !== 0) {
        let playerWon = false;  
        if((diceValues[0] + diceValues[1]) < 7 && playerSlot === 1) {
          playerWon = true;
        } else if((diceValues[0] + diceValues[1]) > 7 && playerSlot === 3) {
          playerWon = true;
        } else if((diceValues[0] + diceValues[1]) === 7 && playerSlot === 2){
          playerWon = true;
        }
        if(playerWon) {
          alert(`you won!!!, player slot: ${playerSlot}, dicevalue: ${diceValues[0]} and ${diceValues[1]}`)
        } else {
          alert(`you lost, player slot: ${playerSlot} dicevalue: ${diceValues[0]} and ${diceValues[1]}`)
        }
      }

      init();
  }
  const rollDiceNow = () => {
    //   return;
    dispatch(rollDice());
    // endGame();
  }
  const onPress = (val) => {
      if(isSelectionAvailable) {
        switch(val) {
            case '7Down':
                dispatch(assignPlayAreaToPlayer(1));
                break;
            case '7Up':
              dispatch(assignPlayAreaToPlayer(3));
              break;
            case '7':
              dispatch(assignPlayAreaToPlayer(2));
              break;
        }
      }

  }
  const stopTimer = () => {
      alert('rolling dice now')
    rollDiceNow();

  }
  return (
    <>
    <View>
        <Button onTouchEnd={onStartGame} disabled={gameStart}>Start Game</Button>
    </View>
    {
        gameStart && searchingPlayer &&
        <>
        <View>
            <Text>Please Wait... searching for player</Text>
        </View>
        </>
    }
        <View>
            <Text>Please select your selection in...</Text>
            <CountdownCircleTimer
            key={currentTimer}
                isPlaying
                duration={10}
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
                onComplete={stopTimer}
            >
              {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: animatedColor }}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
        </View>
      <View style={{ paddingVertical: 10, paddingHorizontal: 10, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <SingleArea subTitle={[playerSlot === 1 ? player.name : '', opponentSlot === 1 ? opponent.name : '']} selectionAvailable={isSelectionAvailable} id={'7DOWN'} title={'7 Down'} onPress={() => onPress('7Down')}/>
        <SingleArea subTitle={[playerSlot === 2 ? player.name : '', opponentSlot === 2 ? opponent.name : '']} selectionAvailable={isSelectionAvailable} title={'7'} onPress={() => onPress('7')}/>
        <SingleArea subTitle={[playerSlot === 3 ? player.name : '', opponentSlot === 3 ? opponent.name : '']} selectionAvailable={isSelectionAvailable} title={'7 Up'} onPress={() => onPress('7Up')}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
});
