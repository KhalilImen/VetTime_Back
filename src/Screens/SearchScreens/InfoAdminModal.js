import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView ,FlatList,Dimensions, Image, Modal } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalButton from "../../Components/ModalButton";
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../consts/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonVisit from "../../Components/ButtonVisit";
import ButtonContact from "../../Components/ButtonContact";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');
const modalWidth = 300; // Set your modal width
const modalHeight = 270; 

const InfoAdminModal = ({ visible, onClose, onSave, name, phoneNumber,email,id,joinDate}) => {
    //console.log("This is the ADMINID of CLIENT INFO",AdminId)
    
 const navigation = useNavigation();
  const [editedName, setEditedName] = useState(name);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
  const [editedEmail, setEditedEmail] = useState(email);

   



  return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
     onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
          
            source={require('../../../assets/logoBlue.png')}
            resizeMode="contain"
            style={styles.imageStyle}
          />

    
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#8C9999" style={styles.Icon} /> 
            <Text style={styles.textWithIcon}>{editedName}</Text>
          </View>

      
          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#8C9999" /> 
            <Text style={styles.textWithIcon}>{editedEmail}</Text>
          </View>

 
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#8C9999" /> 
            <Text style={styles.textWithIcon}>{editedPhoneNumber}</Text>
          </View>
                              <View style={styles.inputContainer}>
           
            <Text style={styles.join}>joined in :{joinDate.split("T")[0]}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default InfoAdminModal;

const styles = StyleSheet.create({
  inputContainer:{
     height: windowHeight * 0.05,
    
    
    alignItems: 'center',
     flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: modalWidth,
    height: modalHeight,
    backgroundColor: 'rgba(225,225,225, 0.92)',
    borderRadius: 10,
    padding: 20,
 
  
  },
    actionIcon: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C9999',
    marginLeft: 20,
    marginTop:1,
    borderRadius: 15,
  },

  textWithIcon:{
    left:windowWidth*0.1,
      fontSize: 17,
      color: COLORS.gray,
      fontWeight: 'bold'
  },
    join:{
    left:windowWidth*0.12,
      fontSize: 17,
      color: COLORS.gray,
      fontWeight: 'light'
  },
         imageStyle: {
        width: '30%',
        height: windowHeight * 0.09,
        left:windowWidth*0.23,
        
    },
    view:{
       height: windowHeight * 0.04,
    },

    buttonContainer:{

      left:windowWidth*0.1,
      bottom: windowHeight*0.01,
       flexDirection: 'row',
    },
      SignUp:{
     backgroundColor:COLORS.blue,
        opacity:1,
        width: 100,  
        height: 40,
         alignItems: 'center',
       
  },
    Login:{
     backgroundColor:COLORS.white,
        opacity:1,
        width: 100,
        borderWidth: 2,
        height: 40,
         borderColor:COLORS.blue,
          alignItems: 'center',
  },
    text1:{
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.blue,
        marginTop:windowHeight*0.01
        
      
  },
    text2:{
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.white,
        marginTop:windowHeight*0.01
  },
    logSignContainer:{
    width: 80,
        flexDirection: 'row',
         marginTop: windowHeight*0.01,
        //  right: windowWidth*0.001,
         left: windowWidth*0.08,
          alignItems: 'center',
  },
});