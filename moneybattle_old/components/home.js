import React, {useDebugValue, useEffect, useReducer, useState} from 'react'
import { StatusBar } from 'react-native';
import { Text, View, ScrollView, StyleSheet, Platform, Animated, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants'
import Colors from '../colors';
import image from '../assets/money_battle.png';
import diceRoll1 from '../assets/dice_final3.gif';
import diceRoll2 from '../assets/dice_roll1_mirror.gif';
import { makeid, diceGenerator } from '../components/lib/randomNumberGenerator'; 
import { Audio } from 'expo-av';
import axios from 'axios';

// You can import from local files
// import Profilecard from './components/profilecard'
// import Gamecontainer from './components/dicecontainer';
// import PlayAreas from './components/playareas';
import AvatarComp from './avatar';
import FindingPlayerIcon from './findingPlayerIcon';
import SingleArea from './singlearea';
import { LinearGradient } from 'expo-linear-gradient'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import Bubble from './assets/Freesample.svg';
import BubbleSVG from '../svgs/BubbleSVG';
import rollingDice from '../assets/rollingDice.gif';
import dice1 from '../assets/dice1.png';
import dice2 from '../assets/dice2.png';
import dice3 from '../assets/dice3.png';
import dice4 from '../assets/dice4.png';
import dice5 from '../assets/dice5.png';
import dice6 from '../assets/dice6.png';


import coins from '../assets/coins.png';
import TennisBall from '../TennisBall';
import firebase from 'firebase'
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
// import { SvgUri } from 'react-native-svg';

// or any pure javascript modules available in npm

const diceImages = {
  1: dice1, 2: dice2, 3: dice3, 4: dice4, 5:dice5, 6:dice6
}
export default function home(props) { 
  // const [endGame, setEndGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  // const [buttonText, setButtonText] = useState('Start Game');
  const [findingPlayers, setFindingPlayers] = useState(false);
  const [timer, setTimer] = useState(false);
  const [rollDice, setRollDice] =useState(false);
  const [diceValues, setDiceValues] = useState([]);
  const [balloonText, setBalloonText] = useState('');
  const [showBalloon, setShowBalloon] = useState(false);
  const [showNextGameButton, setShowNextGameButton] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(0);
  // const [opponent, setOpponent] = useState({
  //   name: 'AB', slot: 2, src: null
  // });
  const [opponent, setOpponent] = useState(null);
  const [player, setPlayer] = useState({
    name: 'Abhijeet', slot: null, src: require('../assets/profilepic.jpg'),
    coins: 500
  })
  const [currentTimer, setCurrentTimer] = useState(1);
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    if(diceValues && diceValues.length>0) {
      endGame();
    }
  }, [diceValues])
  const [sound, setSound] = React.useState();

  const playSound = async () =>  {
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/dice_roll_audio.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  useEffect(() => {

  }, [])

  const endGame = () => {
    let playerWon = false;  
    if(diceValues.length !== 0) {
      if((diceValues[0].value + diceValues[1].value) < 7 && player.slot === 1) {
        playerWon = true;
      } else if((diceValues[0].value + diceValues[1].value) > 7 && player.slot === 3) {
        playerWon = true;
      } else if((diceValues[0].value + diceValues[1].value) === 7 && player.slot === 2){
        playerWon = true;
      }
    }
    if(playerWon) {
      setPlayer({...player, coins: player.coins+5})
      setBalloonText('You won Rs.5!!!');
      setShowBalloon(true);
    } else {
      setPlayer({...player, coins: player.coins-5})
      setBalloonText('Sorry, you lost Rs.5!!!');
      setShowBalloon(true);
    }
    setShowNextGameButton(true);
  }
  const init = () => {
    setStartGame(false);
    setHideButton(false);
    // setButtonText('Start Game');
    setFindingPlayers(false);
    setTimer(false);
    setRollDice(false);
    setDiceValues([]);
    setBalloonText('');
    setShowBalloon(false);
    setShowNextGameButton(false);
    setOpponent(null);
    setPlayer({...player, slot:null})
  }
  const onStartGame = () => {
    // if(buttonText === 'Start Game') {
      setStartGame(true);
      setHideButton(true);
      findPlayers();
    // }
  }

  const triggerFindPlayers = () => {
    axios.post('/findPlayers', {
      uid: currentUser.uid
    }).then(data => {
      
    }, err => {

    })
  }

  const findPlayers = () => {
    setFindingPlayers(true);
    setBalloonText('Finding match...');
    setShowBalloon(true);
    triggerFindPlayers();
    setTimeout(() => {
      // setHideButton(true);
      setCurrentTimer(currentTimer+1);
      setTimer(true);
      setFindingPlayers(false);
      setOpponent({name: makeid(2), slot: 2});
      setPlayer({...player, slot: 2});
      setBalloonText('');
      setShowBalloon(false);
    }, 4000)
  }
  const stopTimer = () => {
    setTimer(false); 
    // setHideButton(false);
    // alert('rolling dice now')
  rollDiceNow();
  }

  const rollDiceNow = () => {
    getDiceValues();
    setRollDice(true);
    playSound();
    setBalloonText('Rolling Dice...');
    setShowBalloon(true);
    setTimeout(() => {

      setRollDice(false);
    }, 5000)
  }

  const getDiceValues = () => {
    let dv = [];
    let values = [diceGenerator(), diceGenerator()];
    values.forEach((item, index) => {
      dv.push({
        value: item,
        // image: diceImages[item],
        image: index === 0 ? diceRoll1 : diceRoll2,
        // styles: index === 0 ? styles.diceImage1 : styles.diceImage2
      })
    });
    setDiceValues(dv)
  }
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Text style={styles.timerInner}>Times up...</Text>;
    }
  
    return (
      <View style={styles.timerInner}>
        {/* <Text style={styles.timerText}>Remaining</Text> */}
        <Text style={styles.timerValue}>{remainingTime}</Text>
        {/* <Text style={styles.timerText}>seconds</Text> */}
      </View>
    );
  };
  const onPress = (val) => {
    switch(val) {
      case '7Up':
        setPlayer({
          ...player, slot:3
        })
        break;
      case '7Down':
        setPlayer({
          ...player, slot:1
        })
        break;
      case '7':
        setPlayer({
          ...player, slot:2
        })
        break;
    }
  }
  const onNextGame = () => {
    init();
    onStartGame();
  }
  const resetAnimationFn = () => {
    setResetAnimation(resetAnimation+1);
}
const signout = () => {
  firebase.auth().signOut();
  alert('signed out')
}
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor={Colors["rich-text-panel-bg"]}/>
      <View style={{height: '100%', width: '100%', position: 'relative'}}>
       {/* <Profilecard/> */}
      
       <Image source={image} style={styles.backgroundImage} />

       {/* <Image source={diceRoll1} style={styles.diceImage1} />
       <Image source={diceRoll2} style={styles.diceImage2} /> */}
      
      <View style={styles.coinContainer}>
        <View style={styles.coinInnerContainer}>
        <Image source={coins}   style={styles.coinImage}/>
        </View>
        <View style={styles.coinTextContainer}>
          <Text style={styles.coinText}>{player.coins}</Text>
        </View>
      </View>
       {
         findingPlayers &&
         <FindingPlayerIcon style={[  
          styles.avatar, {right: 50, top: 150}
       ]} />
       }
       {
          startGame &&
          <AvatarComp 
          slot={player.slot}
          src={player.src}
          style={[  
            styles.avatar, {left: 50}
          ]} title={`${player.name} `}/>
       }
       {
         opponent && startGame && 
         <AvatarComp 
         slot={opponent.slot}
         src={null}
         title={`${opponent.name} `}
         style={{ 
            ...styles.avatar, right:50
          }}
         />
        //  <Avatar style={} name={opponent.name}/>
       }


       {
         !hideButton && 
         <View style={styles.gradient}>
         <LinearGradient colors={['#380036', '#0CBABA']} style={{justifyContent: 'center',borderRadius: 10, width: 150, height: 50 }}>
        <Button style={styles.buttonStart} color='white' onTouchEnd={onStartGame}>Start Game</Button>
         </LinearGradient>
         </View>
       }

       {
          timer && startGame &&
          <View style={styles.timerCompContainer}>
                      <View style={styles.timerComp}>
          <Text style={{color: 'white', marginBottom: 5}}>Please select your selection in...</Text>
          <CountdownCircleTimer
          key={currentTimer}
              isPlaying
              size={120}
              trailColor='white'
              duration={10}
              colors={[
                ['#004777', 0.4],
                ['#F7B801', 0.4],
                ['#A30000', 0.2],
              ]}
              onComplete={stopTimer}
          >
            {renderTime}
          </CountdownCircleTimer>
          </View>
        </View>

       }
       {
         timer && player && opponent && startGame &&
         <View style={styles.playAreaComp}>
          <View style={{ paddingVertical: 10, paddingHorizontal: 10, width: 600, height: 160, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <SingleArea 
        slot={1}
        players={[player, opponent]}
        key={1} id={1} subTitle={[player.slot === 1 ? player.name : '', opponent.slot === 1 ? opponent.name : '']} selectionAvailable={timer}  title={'7 Down'} onPress={() => onPress('7Down')}/>
        <SingleArea 
                slot={2}
                players={[player, opponent]}
        key={2} id={2} subTitle={[player.slot === 2 ? player.name : '', opponent.slot === 2 ? opponent.name : '']} selectionAvailable={timer} title={'7'} onPress={() => onPress('7')}/>
        <SingleArea 
                slot={3}
                players={[player, opponent]}
        key={3} id={3} subTitle={[player.slot === 3 ? player.name : '', opponent.slot === 3 ? opponent.name : '']} selectionAvailable={timer} title={'7 Up'} onPress={() => onPress('7Up')}/>
          </View>
         </View>
       }

       {
         showBalloon && 
         <View style={styles.bubbleContainer}>
         <View style={styles.bubbleInnerContainer}>
           <BubbleSVG />
             {/* <SvgUri  width="100%" height="100%" 
             uri={require('./assets/bubble.svg')} style={styles.bubbleImage} /> */}
             <Text style={styles.bubbleText}>{balloonText}</Text>
         </View>
        </View>
       }


      {
        rollDice && startGame &&
        diceValues.map((item, index) => 
        <Image key={index} style={index === 0 ? styles.diceImage1 : styles.diceImage2} source={item.image} />
      //   <View key={index} style={[styles.rollingDiceContainer, { left: index*200 + 320}]}>
      //   <View style={styles.rollingDiceInnerContainer}>
      //     <Image source={rollingDice}   style={styles.bubbleImage}/>
      //   </View>
      // </View> 
      )
      //   diceValues.map((item, index) => <View key={index} style={[styles.rollingDiceContainer, { left: index*200 + 320}]}>
      //     <View style={styles.rollingDiceInnerContainer}>
      //       <Image source={rollingDice}   style={styles.bubbleImage}/>
      //     </View>
      //  </View> )
      }

      {/* {
        !rollDice && diceValues && diceValues.length>0 && startGame &&
        diceValues.map((item, index) => <View key={index} style={[styles.diceContainer, { left: item.left}]}>
          <View style={styles.diceInnerContainer}>
            <Image source={item.image}   style={styles.bubbleImage}/>
          </View>
       </View>)
      } */}

      {
        showNextGameButton &&
        <View style={{...styles.gradient, top: 360}}>
        <LinearGradient colors={['#380036', '#0CBABA']} style={{justifyContent: 'center',borderRadius: 10, width: 150, height: 50 }}>
       <Button style={styles.buttonStart} color='white' onTouchEnd={onNextGame}>Next Game</Button>
        </LinearGradient>
        </View>
      }



       {/* <View style={[styles.diceContainer, { left: 520}]}>
          <View style={styles.diceInnerContainer}>
            <Image source={dice2}   style={styles.bubbleImage}/>
          </View>
       </View> */}

       {/* <PlayAreas title={'A'}/> */}
       {/* <Gamecontainer /> */}
       {/* </ImageBackground> */}
       <Button style={{backgroundColor: 'white', color:'black'}} onTouchEnd={() => signout()}>Log Out</Button>
       <Button style={styles.buttonReset} color='white' onTouchEnd={resetAnimationFn}>Reset</Button>
       {/* <TennisBall resetAnimation={resetAnimation}  /> */}
      </View>
    </View>
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
    top: 600
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
  },
  diceImage1: {
    position: 'absolute',
    top: 100,
    left: 200,
    bottom: 0,
    width: '60%',
    height: '100%',
    resizeMode: "contain",
  },
  diceImage2: {
    position: 'absolute',
    top: 100,
    right: 200,
    bottom: 0,
    width: '60%',
    height: '100%',
    resizeMode: "contain",
  }
})
