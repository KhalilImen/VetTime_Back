import React from 'react'
import DashboardAdmin from '../Screens/DashboardAdmin';
import HomeSupAdmin from '../Screens/HomeSupAdmin';
import HomeAdmin from '../Screens/HomeAdmin';
import SearchClientVisit from '../Screens/SearchScreens/SearchClientVisit';
import InterventionScreen from '../Screens/SearchScreens/InterventionScreen';
import SearchClient from '../Screens/SearchScreens/SearchClient';
import ProfileAdmin from '../Screens/Profiles/ProfileAdmin';
import AdminDrawer from './Drawers/AdminDrawer';
import SearchAgent from "../Screens/SearchScreens/SearchAgent"
import VetMessageScreen from '../Screens/messageScreens/VetMessageScreen';

export default function (Stack) {
  return (
    <>
    {/**/}
    <Stack.Screen name="HomeAdmin" component={AdminDrawer} options={{ headerShown: false }}/>
    <Stack.Screen name="DashboardAdmin" component={AdminDrawer} options={{ headerShown: false }}/>
    <Stack.Screen name="SearchClientVisit" component={AdminDrawer} options={{ headerShown: false }}/>
    <Stack.Screen name="InterventionScreen" component={AdminDrawer} options={{ headerShown: false }} />
    <Stack.Screen name="SearchClient" component={AdminDrawer} options={{ headerShown: false }} />
    <Stack.Screen name="SearchAgent" component={AdminDrawer} options={{ headerShown: false }} />
    <Stack.Screen name="VetMessageScreen" component={VetMessageScreen} options={{ headerShown: false }} />
    

</>
)
}