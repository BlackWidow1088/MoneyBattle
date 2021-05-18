import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles'
import firebase from 'firebase'
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { updateEmail, updatePassword, login, getUser, facebookLogin} from '../store/actions/user'

export default (props) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user){
              let firebaseUser = await getUser(user.uid); 
              dispatch({type: 'LOGIN', payload: firebaseUser});
              // props.getUser(user.uid)
              if(firebaseUser != null){
                props.navigation.navigate('Home')
              }
            }
          })
    }, [])
    const loginUser = async () => {
      const response = await login(user);
      if(response) {
        let firebaseUser = await getUser(response.user.uid); 
        dispatch({type: 'LOGIN', payload: firebaseUser});
      }
    }
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.border}
              value={user && user.email}
              onChangeText={input => dispatch(updateEmail(input))}
              placeholder='Email'
          />
          <TextInput
              style={styles.border}
              value={user && user.password}
              onChangeText={input => dispatch(updatePassword(input))}
              placeholder='Password'
              secureTextEntry={true}
          />
            <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
                <Text>Login</Text>
            </TouchableOpacity>
          {/* <TouchableOpacity style={styles.facebookButton} onPress={() => props.facebookLogin()}>
            <Text>Facebook Login</Text>
          </TouchableOpacity> */}
            <Text>OR</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                <Text>Signup</Text>
            </TouchableOpacity>
        </View>
      );
}
