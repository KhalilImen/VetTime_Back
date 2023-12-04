import React from 'react'
import HomeSupAdmin from '../Screens/HomeSupAdmin';
import SupAdminDrawer from './Drawers/SupAdminDrawer';
import ProfileAdmins from '../Screens/Profiles/ProfileSupAdmins';


export default function (Stack) {
  return (
    <>
    {/**/}
    <Stack.Screen name="HomeSupAdmin" component={SupAdminDrawer} options={{ headerShown: false }}/>
    <Stack.Screen name="ProfileAdmins" component={SupAdminDrawer} options={{ headerShown: false }} />
    
</>
)
}