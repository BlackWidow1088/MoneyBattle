import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function Comp(props) {
  return (
    <View style={props.style}>
        <View style={styles.profilepicContainer}>
          <Image
            source={require('../assets/tenor.gif')}
            style={{ height: '100%', width: '100%' }}
          />
          {/* <Text style={styles.title}>Developer/Designer</Text>
          <Text style={{ fontSize: 14, color: '#F3F3F3' }}>Gurugram/India</Text> */}
        </View>
    </View>
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
      alignItems: 'center',
      backgroundColor: 'white',
      width: 120,
      height: 240,
    //   borderRadius: 60
    },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#F3F3F3',
    marginTop: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 30,
  },
})

