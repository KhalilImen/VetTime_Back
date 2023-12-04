import React from 'react'
import Home from '../Screens/Home';
import HomeGuest from '../Screens/HomeGuest';
import HomeTest from '../Screens/HomeTest';
import ProfileClient from '../Screens/Profiles/ProfileClient'
import { View, Text } from 'react-native'
import ClientDrawer from './Drawers/ClientDrawer';
import ClientMessageScreen from '../Screens/messageScreens/ClientMessageScreen'
import HomeIntermediaire from '../Screens/HomeIntermediaire';

export default function (Stack) {
  return (
    <>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="HomeGuest" component={HomeGuest} options={{ headerShown: false }}/>
    <Stack.Screen name="HomeTest" component={ClientDrawer} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileClient" component={ClientDrawer} options={{ headerShown: false }} />
     <Stack.Screen name="ClientMessageScreen" component={ClientMessageScreen} options={{ headerShown: false }} />
    <Stack.Screen name="HomeIntermediaire" component={ClientDrawer} options={{ headerShown: false }} />
 
    </>
  )
}