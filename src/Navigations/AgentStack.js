import React from 'react'
import AgentDrawer from './Drawers/AgentDrawer';
import HomeAgent from '../Screens/HomeAgent';
import SearchAgentInter from '../Screens/SearchScreens/SearchAgentInter';


export default function (Stack) {
  return (
    <>
    {/**/}
    <Stack.Screen name="HomeAgent" component={AgentDrawer} options={{ headerShown: false }}/>
    <Stack.Screen name="SearchAgentInter " component={AgentDrawer} options={{ headerShown: false }}/>
     <Stack.Screen name="ProfileAgent" component={AgentDrawer}  options={{ headerShown: false }}/> 
</>
)
}