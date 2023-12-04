import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeSupAdmin from '../../Screens/HomeSupAdmin';
import ProfileAdmins from '../../Screens/Profiles/ProfileSupAdmins';
import DrawerClient from '../../Components/DrawerClient';

const Drawer = createDrawerNavigator();

function SupAdminDrawer() {

  return (
        <Drawer.Navigator
      initialRouteName="HomeSupAdmin"
      drawerContent={(props) => <DrawerClient {...props} />} 
    >
      <Drawer.Screen name="HomeSupAdmin" component={HomeSupAdmin} options={{ headerShown: false }} />
      <Drawer.Screen name="ProfileAdmins" component={ProfileAdmins}  options={{ headerShown: false }}/> 
    </Drawer.Navigator>
  );
}

export default SupAdminDrawer;