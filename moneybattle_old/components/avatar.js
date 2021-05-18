import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function Comp(props) {
  const slotNames = {
    1: '7 Down ',
    2: '7',
    3: '7 Up '
  }
  return (
    <LinearGradient
    key={props.id}
    colors={['#EC3750', '#A33140']}
    style={[props.style, props.slot ? {borderRadius: 10, padding: 5}: { borderRadius: 40, }]}>
    {/* <View style={[ props.slot ? {padding: 10}: {}]}> */}
      {
        props.slot &&
        <View style={styles.slotContainer}>
            <Text style={styles.slotText}>{`${slotNames[props.slot]}  `}</Text>
        </View>
      }
        <View style={styles.profilepicContainer}>
          {
            props.src &&
            <Image
            source={props.src}
            style={{ height: '100%', width: '100%' }}
          />
          }
          {
            !props.src &&
            <View>
              <Text style={[styles.title, {fontSize: 20}]}>{props.title}</Text>
            </View>
          }
        </View>
        {
            props.title &&  props.src &&
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title}>{props.title}</Text>
              </View>
          }
    {/* </View> */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: { display: 'flex', flexDirection: 'column' },
  header: { marginTop: 10, flexDirection: 'row' },
  nameContainer: { position: 'absolute', width: '100%' },
  nameText: {
    color: 'white',
    textAlign: 'center',
    paddingRight: 8,
    fontSize: 15,
  },
  profilepicContainer: { 
    position:'relative',
    display: 'flex', justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#191919',
      width: 80,
      height: 80,
      borderRadius: 40
    },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    overflow: 'visible',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 30,
  },
  slotContainer: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    marginBottom: 5
  },
  slotText:  {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

