import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,Image } from 'react-native';
import ButtonWithLoader from '../Components/ButtonWithLoader';
import { useSelector } from 'react-redux';
const Home = ({ navigation }) => {
        const userData = useSelector((state)=> state.auth.userData)
        console.log("user data",userData)
    return (
        <SafeAreaView style={styles.container}>
        {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Username: {userData.user.name}</Text>
          <Text style={styles.userInfoText}>Email: {userData.user.email}</Text>
        </View>
      )}
                <View style={{marginLeft : 70, marginTop:30}}>  
           <ButtonWithLoader
                text="Reset Password"
                onPress={() => navigation.navigate('ResetPswd')}
            />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        padding: 24,
     backgroundColor:'rgba(56, 186, 184, 0.57)'
    },

    TitleStyle:{
        flex:1,
    marginTop:-170,
    color: '#FFF',
    fontStyle: 'normal',
    fontWeight: '700',
        fontSize: 90,
    fontStyle: 'normal',
    lineHeight: 79,
  
    },

});


export default Home;