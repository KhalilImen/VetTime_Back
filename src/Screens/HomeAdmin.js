import { View, Text, StyleSheet, Image,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchClient from '../Screens/SearchScreens/SearchClient';
import SearchAgent from '../Screens/SearchScreens/SearchAgent';
import { useSelector } from 'react-redux';


function HomeAdmin() {
        const userData = useSelector((state)=> state.auth.userData)
        console.log("user data",userData)
  return (
    
    <SafeAreaView style={styles.container}>
      <SearchClient userData={userData} /> 
          {/* <SearchAgent userData={userData} /> */}
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

export default HomeAdmin;