import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import SupAdminStack from './SupAdminStack';
import AgentStack from './AgentStack';
import { useSelector } from 'react-redux';

import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function Routes (){
    const userData = useSelector((state)=> state.auth.userData)
        console.log("user data",userData)
    return(
        
        <NavigationContainer>
      <Stack.Navigator >
        {/* Stack.Screen for DrawerNavigator */}
        
             {/* the auth stack is going to be replaced with Welcome Page  */}
                {!!userData && userData?.access_token ? MainStack(Stack):AuthStack(Stack)}
                 {MainStack(Stack)}
                 {AdminStack(Stack)}
                 {SupAdminStack(Stack)}
                 {AgentStack(Stack)}
                
              
            </Stack.Navigator>
        </NavigationContainer>
    );
}