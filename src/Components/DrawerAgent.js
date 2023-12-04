import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
const DrawerAgent = ({ navigation }) => {
        const userData = useSelector((state)=> state.auth.userData)
        console.log("user data",userData)
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
            navigation.navigate('HomeAgent');
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
            navigation.navigate('ProfileAgent');
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
            navigation.navigate('Profile');
          }}
        >
        </TouchableOpacity>
                <TouchableOpacity
          style={styles.navigate2}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
                  {/* <View style={styles.iconTextContainer2}>
            <AntDesign name="aliwangwang" size={27} color={COLORS.white} style={styles.PersonIcon} />
            <Text style={styles.Home}>Messages</Text>
          </View> */}

        </TouchableOpacity>
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

export default DrawerAgent;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'rgba(56, 186, 184, 0.57)',
    borderTopRightRadius: 350, // Adjust the radius as needed
    borderBottomRightRadius: 200, // Adjust the radius as needed
    overflow: 'hidden', // Hide any overflow outside the rounded corners
  },
  container: {
    padding: 24,
  },
Username: {
  fontSize: 26,
  marginVertical: 6,
  color: COLORS.gray, // Couleur dorée
  fontStyle: 'italic', // Texte en italique (incliné)
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
  },
  iconTextContainer2: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
    iconTextContainer3: {
    marginTop: -30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  HomeIcon: {
    marginLeft: -90, // Adjust the margin as needed
  },
    Leave: {
         marginTop: 350,
    
  },
      Logout: {
         fontSize: 19,
    color: COLORS.red,
     marginLeft: 10,
    
  },
  PersonIcon: {
    marginLeft: -14, // Adjust the margin as needed
  },
  Home: {
    fontSize: 20,
    color: COLORS.white,
  },
});