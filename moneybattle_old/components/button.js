import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function Comp({ title, onPress }) {
  return (
    <>
      <View style={{ width: 100 }}>
        <TouchableOpacity
          onPress={() => {
            onPress()
          }}>
          <LinearGradient
            colors={['#EC3750', '#A33140']}
            style={{ borderRadius: 5, padding: 10 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {title}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  )
}
