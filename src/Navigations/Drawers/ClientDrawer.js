import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTest from '../../Screens/HomeTest';
import ProfileClient from '../../Screens/Profiles/ProfileClient'
import DrawerClient from '../../Components/DrawerClient';
import HomeIntermediaire from '../../Screens/HomeIntermediaire';


const Drawer = createDrawerNavigator();

function ClientDrawer() {

  return (
        <Drawer.Navigator
      initialRouteName="HomeTest"
      drawerContent={(props) => <DrawerClient {...props} />} 
    >
      <Drawer.Screen name="HomeIntermediaire" component={HomeIntermediaire} options={{ headerShown: false }} />
      <Drawer.Screen name="ProfileClient" component={ProfileClient}  options={{ headerShown: false }}/> 

    </Drawer.Navigator>
  );
}

export default ClientDrawer;