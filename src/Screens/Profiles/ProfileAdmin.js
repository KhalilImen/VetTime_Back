import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,Image, Dimensions } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import EditAdminModal from '../EditModals/EditAdminModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');


const ProfileAdmins = ({ navigation }) => {

const [isEditing, setIsEditing] = useState(false);
const handleEdit = () => {
    setIsEditing(true);
  };

    const handleSave = () => {
    setIsEditing(false);
  };
const userData = useSelector((state) => state.auth.userData);
// console.log("user data",userData)
  const profileImageSource = userData?.user?.Pic
    ? { uri: userData.user.Pic }
    : require('../../../assets/cat2.jpg');
      const phoneNumber = userData?.user?.phoneNumber
    ?   userData.user.phoneNumber 
    : 'Not available';

  return (
    <SafeAreaView style={styles.container}>
                <Image
                source={require('../../../assets/Login.png')}
                resizeMode="contain"
                style={styles.imageStyle}
            />
    <View style={styles. BeforeImagecontainer}>
        <Image
          source={require('../../../assets/UnionS.png')}
         
        />
    </View>
     <TouchableOpacity style={styles.EditIcon} onPress={handleEdit}>              
     <AntDesign
          name="edit"
          size={27}
          color="#000" // Change the color to your desired color
         
        />
        </TouchableOpacity>


      <View style={styles.Imagecontainer}>
       
        <TouchableOpacity style={styles.pic} onPress={handleEdit}>  
        <Image
          source={profileImageSource}
          style={styles.ProfilePic}
        />
 </TouchableOpacity>
      </View>


            <View style={styles.Name}>
        {userData && (
          <View style={styles.userInfo}>
         
            <Text style={styles.Username}>{userData.user.name}</Text>
          </View>
        )}
        <AntDesign name="user" size={24} style={styles.UsernameIcon} />
      </View>
            <View style={styles.Email}>
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.UserEmail}>{userData.user.email}</Text>
          </View>
        )}
         <AntDesign name="mail" size={24}  style={styles.UseremailIcon}/>
      </View>
           
       <View style={styles.Password}>
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.UserPassword}>............</Text>
          </View>
        )}
        <AntDesign name="lock" size={24} style={styles.UserPasswordIcon} />
      </View>
        <View style={styles.Phone}>
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.UserPhone}>{ phoneNumber} </Text>
          </View>
        )}
        <AntDesign name="phone" size={24} style={styles.UserPhoneIcon}/>
      </View>
                      {/* <View style={{marginLeft : 70, marginTop:30}}>  
           <ButtonWithLoader
                text="Reset Password"
                onPress={() => navigation.navigate('ResetPswd')}
            />
            </View> */}


        <EditAdminModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        name={userData.user.name}
        phoneNumber={userData.user.phoneNumber}
        email={userData.user.email}
        password={userData.user.password}
        id={userData.user.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor:COLORS.blue,
  },
  // pic:{
  //   top:height*0.2,
  //       marginLeft : width*0.2,
       
  // },
      EditIcon: {
         bottom:height*0.01,
        marginLeft : width*0.8,
        color: COLORS.red,
    },
    Name: {
          top:height*0.11,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
          flexDirection:'row',
          },
                  Username: {
        bottom:height*0.01,
        right : width*0.25,
        fontSize: 18,
        fontWeight: 'light',
        color: COLORS.gray,
    },
    UsernameIcon: {
        bottom:height*0.01,
        right : width*0.45,
        
        fontWeight: 'light',
        color: COLORS.gray,
    },
      Email: {
          bottom:height*0.1,
          height: 250,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
          },
        UserEmail: {
        top:height*0.13,
        right : width*0.16,
        fontSize: 18,
        fontWeight: 'light',
        color: COLORS.gray,
    },
        UseremailIcon: {
        top:height*0.104,
        right : width*0.39,
        
        fontWeight: 'light',
        color: COLORS.gray,
    },
       Password: {
          bottom:height*0.3,
          height: 250,
            width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
            },
        UserPassword: {
        top:height*0.13,
        right : width*0.2,
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.gray,
    },
            UserPasswordIcon: {
       top:height*0.104,
        right : width*0.39,
        
        fontWeight: 'light',
        color: COLORS.gray,
    },
         Phone: {
          bottom:height*0.5,
          height: 250,
            width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
            },
         UserPhone: {
        top:height*0.13,
        right : width*0.2,
        fontSize: 18,
        fontWeight: 'light',
        color: COLORS.gray,
    },
            UserPhoneIcon: {
        top:height*0.098,
        right : width*0.39,
         transform: [{ scaleX: -1 }] ,
        fontWeight: 'light',
        color: COLORS.gray,
    },
      Imagecontainer: {
          top:height*0.1,
          height: 250,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection:'row'
         
  },
    ProfilePic:{
        height: 160,
        width: 160,
        borderRadius: 70,
  },
      BeforeImagecontainer: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        width: width * 0.7, 
        height:height * 0.2, 
  },

    imageStyle: {
         width: '20%',
         right:width*0.02,
    },


});

export default ProfileAdmins;



