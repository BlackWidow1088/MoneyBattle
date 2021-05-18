import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { updateEmail, updatePassword, updateUsername, updateBio, signup } from '../store/actions/user'
import styles from '../styles'

export default (props) =>  {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
  const signupUser = async () => {
    let temp = await signup(user);
    dispatch({type: 'LOGIN', payload: temp})
    props.navigation.navigate('Home')
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
        <TextInput
        	style={styles.border}
        	value={user && user.username}
        	onChangeText={input => dispatch(updateUsername(input))}
        	placeholder='Username'
        />
        <TextInput
        	style={styles.border}
        	value={user && user.bio}
        	onChangeText={input => dispatch(updateBio(input))}
        	placeholder='Bio'
        />
      	<TouchableOpacity style={styles.button} onPress={() => signupUser()}>
      		<Text>Signup</Text>
      	</TouchableOpacity>
      </View>
    );
  }
