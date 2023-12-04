import { View, Text, StyleSheet, Image,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../Screens/SearchScreens/Search';
import actions from '../redux/actions';
import { useSelector } from 'react-redux';


function HomeSupAdmin() {
        const userData = useSelector((state)=> state.auth.userData)
        console.log("user data",userData)
  return (
    <SafeAreaView style={styles.container}>
      <Search userData={userData} /> 
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

export default HomeSupAdmin;