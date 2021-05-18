import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AvatarComp from './avatar';
export default function Comp({ slot, subTitle, title, selectionAvailable, onPress, id, players }) {
  // console.log('subtutle ', subTitle);
  return (
    <>
        <View style={styles.playCardContainer} key={id}>
          <TouchableOpacity
          activeOpacity={0.6}
          disabled={!selectionAvailable}
          onPress={() => {
            onPress()
          }}>
          <LinearGradient
            colors={['#EC3750', '#A33140']}
            style={{ borderRadius: 5, padding: 5 }}>
             <View style={styles.fullSize}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 10
                }}>
                {title}
              </Text>
              {/* {
                subTitle && subTitle.map(item => <View>
                  <Text  style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                }}>{item}</Text>
                </View>)
              } */}
              <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
              {
            players &&
            players.map((item, index) => {
              return (
                  item.slot === slot &&
                  <View key={index}>
                  <AvatarComp 
                  id={index}
                  src={item.src}
                  title={`${item.name} `}
                  // style={{ 
                  //    ...styles.avatar,
                  //  }}
                  />
                </View>
              )
            })
          }
              </View>

            </View>

          </LinearGradient>
        </TouchableOpacity>
          </View>
    </>
  )
}

const styles = StyleSheet.create({
    playCardContainer: {
        // flex: 1, 
        width: '32%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        overflow: 'hidden'
        // height: 100,
        // height: 100,
        // width:'100%',
        // aspectRatio: 1,
    },
    fullSize: {
      position:'relative',
        height: '100%',
        width: '100%'
    },
    // avatar: {
    //   // position: 'absolute',
    //   //  top: 0
    // },
});
