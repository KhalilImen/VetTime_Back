import React from 'react'
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import ForgotPswd from '../Screens/ForgotPswd';
import Welcome from '../Screens/Welcome';
import ResetPswd from '../Screens/ResetPswd';

import { View, Text } from 'react-native'


export default function (Stack) {
  return (
    <>
    {/**/}
    
    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
    <Stack.Screen name="ForgotPswd" component={ForgotPswd} options={{ headerShown: false }}/>
    <Stack.Screen name="ResetPswd" component={ResetPswd} options={{ headerShown: false }}/> 
   
</>
  )
}