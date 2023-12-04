import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerAgent from '../../Components/DrawerAgent';
import HomeAgent from '../../Screens/HomeAgent';
import ProfileAgent from '../../Screens/Profiles/ProfileAgent';


const Drawer = createDrawerNavigator();

function AgentDrawer() {

  return (
        <Drawer.Navigator
      initialRouteName="HomeAgent"
      drawerContent={(props) => <DrawerAgent {...props} />} 
    >
      <Drawer.Screen name="HomeAgent" component={HomeAgent} options={{ headerShown: false }} />
      <Drawer.Screen name="ProfileAgent" component={ProfileAgent}  options={{ headerShown: false }}/> 
    </Drawer.Navigator>
  );
}
export default AgentDrawer;