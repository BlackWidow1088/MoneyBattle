import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function Comp() {
  return (
    <>
      <LinearGradient colors={['#EC3750', '#A33140']} style={styles.gradient}>
        <View style={styles.header}>
          <Image
            source={require('../assets/icons/backicon.png')}
            style={{ width: 9.5, height: 16, marginLeft: 15 }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Harsh Bajpai</Text>
          </View>
        </View>

        <View style={styles.profilepicContainer}>
          <Image
            source={require('../assets/profilepic.jpg')}
            style={{ height: 100, width: 100 }}
          />
          <Text style={styles.title}>Developer/Designer</Text>
          <Text style={{ fontSize: 14, color: '#F3F3F3' }}>Gurugram/India</Text>
        </View>
        <View>
          <View style={styles.iconContainer}>
            {imgarr.map((image) => (
              <Image source={image} style={{ width: 45, height: 45 }} />
            ))}
          </View>
        </View>
      </LinearGradient>
    </>
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
  profilepicContainer: { alignItems: 'center', marginTop: 25 },
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

const imgarr = [
  require('../assets/icons/phoneicon.png'),
  require('../assets/icons/messageicon.png'),
  require('../assets/icons/mailicon.png'),
  require('../assets/icons/likeicon.png'),
]
