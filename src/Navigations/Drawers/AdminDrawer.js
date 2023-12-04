import SearchClient from "../../Screens/SearchScreens/SearchClient";
import SearchClientVisit from "../../Screens/SearchScreens/SearchClientVisit";
import ProfileAdmin from "../../Screens/Profiles/ProfileAdmin";
import InterventionScreen from "../../Screens/SearchScreens/InterventionScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeAdmin from "../../Screens/HomeAdmin";
import DashboardAdmin from "../../Screens/DashboardAdmin";
import DrawerAdmin from "../../Components/DrawerAdmin";
import SearchAgent from "../../Screens/SearchScreens/SearchAgent"
const Drawer = createDrawerNavigator();

function AdminDrawer() {

  return (

    <Drawer.Navigator drawerContent={(props) => <DrawerAdmin {...props} />}>
      <Drawer.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
      <Drawer.Screen name="SearchClient" component={SearchClient} options={{ headerShown: false }} />
      <Drawer.Screen name="SearchClientVisit" component={SearchClientVisit} options={{ headerShown: false }} />
      <Drawer.Screen name="ProfileAdmin" component={ProfileAdmin} options={{ headerShown: false }} />
      <Drawer.Screen name="InterventionScreen" component={InterventionScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="DashboardAdmin" component={DashboardAdmin} options={{ headerShown: false }} />
      <Drawer.Screen name="SearchAgent" component={SearchAgent} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default AdminDrawer;