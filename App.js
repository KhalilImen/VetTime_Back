import React, { useCallback, useEffect, useState } from 'react';
import { Text, View ,StyleSheet,LogBox} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Routes from './src/Navigations/Routes'
import FlashMessage from 'react-native-flash-message';
// Keep the splash screen visible while we fetch resources
//SplashScreen.preventAutoHideAsync();
import { Provider } from 'react-redux';
import store from './src/redux/store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// LogBox.ignoreAllLogs(true); //to ignore warnings activate it laterr !!!!!!


export default function App() 
{

  return (
   
    <Provider store={store}>
      <Routes/>
      <FlashMessage position="top"/>
      </Provider>
  );


}