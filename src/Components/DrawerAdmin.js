import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const DrawerAdmin = ({ navigation }) => {
        const userData = useSelector((state)=> state.auth.userData)
        console.log("user data §§§§§§",userData)
        const navigating= useNavigation();
        console.log("SpecificId!!!!!!!!!!!§§§§§§§§§§!!!!!!!!!:", userData.user.specificId);

   return (
    <View style={styles.drawerContainer}>
      <SafeAreaView style={styles.container}>


        <View
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#f4f4f4',
            borderBottomWidth: 1,
          }}
        >
          <Image
            source={require('../../assets/paw.png')}
            style={{
              height: 130,
              width: 130,
              borderRadius: 65,
            }}
          />
                  {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.Username}>{userData.user.name}</Text>
         
        </View>
      )}
        
        </View>

        <TouchableOpacity
          style={styles.navigate1}
          onPress={() => {
            navigation.navigate('HomeAdmin');
          }}
        >
          <View style={styles.iconTextContainer}>
            <Text style={styles.Home}>Home</Text>
            <Icon name="home" size={27} color={COLORS.white} style={styles.HomeIcon} />
          </View>
        </TouchableOpacity>






          <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('ProfileAdmin');
          }}
        >
          <View style={styles.iconTextContainer2}>
            <Icon name="person" size={27} color={COLORS.white} style={styles.PersonIcon} />
            <Text style={styles.Home}>Profile</Text>
          </View>
        </TouchableOpacity>
                 <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('SearchAgent' ,{AdminId: userData.user.specificId});
          }}
        >
          <View style={styles.iconTextContainer2}>
            <AntDesign name="team" size={27} color={COLORS.white} style={styles.PersonIcon} />
            <Text style={styles.Home}>Agents</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('ProfileAdmin');
          }}
        >
          <View style={styles.iconTextContainer2}>
            <AntDesign name="github" size={27} color={COLORS.white} style={styles.PersonIcon} />
            <Text style={styles.Home}>Visits</Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('DashboardAdmin');
          }}
        >
          <View style={styles.iconTextContainer2}>
            <AntDesign name="linechart" size={27} color={COLORS.white} style={styles.PersonIcon} />
            <Text style={styles.Home}>Statistics</Text>
          </View>
        </TouchableOpacity>
          {/* <View style={styles.iconTextContainer2}>
            <AntDesign name="aliwangwang" size={27} color={COLORS.white} style={styles.PersonIcon} />
            <Text style={styles.Home}>Messages</Text>
          </View> */}
        
        <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
        </TouchableOpacity>

                <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
        <View style={styles.Leave}>
           <View style={styles.iconTextContainer3}>
            <MaterialIcons name="exit-to-app" size={30} color={COLORS.red} />
            <Text style={styles.Logout}>Logout</Text>
            </View>
          </View>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DrawerAdmin ;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'rgba(56, 186, 184, 0.57)',
    borderTopRightRadius: 350, 
    borderBottomRightRadius: 200, 
   
  },
  container: {
    padding: 24,
  },
Username: {
  fontSize: 26,
  marginVertical: 6,
  color: COLORS.gray, 
  fontStyle: 'italic', 
},
  navigate1: {
    marginTop: 50,
    
    left: 20,
  },
  navigate2: {
    marginTop: 0,
    width: 200,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left:width*0.1
  },
  iconTextContainer2: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
    iconTextContainer3: {
    marginTop: height*0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  HomeIcon: {
    right:width*0.3
  },
    Leave: {
        bottom:height*0.1,
    
  },
      Logout: {
         fontSize: 19,
    color: COLORS.red,
     marginLeft: 10,
     bottom:height*0.001,
    
  },
  PersonIcon: {
    marginRight:width*0.07
  },
  Home: {
    fontSize: 20,
    color: COLORS.white,
   
  },
});