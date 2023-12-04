import { View, Text, StyleSheet, Image,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchAgentInter from './SearchScreens/SearchAgentInter';
import { useSelector } from 'react-redux';


function HomeAgent() {
        const userData = useSelector((state)=> state.auth.userData)
        console.log("user data",userData)
  return (
    
    <SafeAreaView style={styles.container}>
      <SearchAgentInter userData={userData} /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#F5F5F5',
  },
});

export default HomeAgent;