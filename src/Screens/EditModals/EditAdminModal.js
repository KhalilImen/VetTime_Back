import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView ,FlatList,Dimensions, Image, Modal } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

import ModalButton from "../../Components/ModalButton";
import TextInputWithLable from '../../Components/TextInputWithLabel';
import validator from '../../utils/validations';
import { showError } from '../../utils/helperFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import actions from "../../redux/actions";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');
const modalWidth = 350; // Set your modal width
const modalHeight = 400; 

const EditAdminModal = ({ visible, onClose, onSave, name, phoneNumber,email,password,id}) => {
    console.log(email)
    console.log(id)

  const [editedName, setEditedName] = useState(name);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPassword, setEditedPassword] = useState(password);

console.log(editedEmail )
console.log(id)
   
   const isValidData = () => {
        const error = validator({
            userName:editedName,
            email:editedEmail,
            password:editedPassword

        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

  const onEdit = async () => {
  const checkValid = isValidData();
  if (checkValid) {
    try {
      const res = await actions.EditAdmin({
        id: id,
        email: editedEmail,
        name: editedName,
        password: editedPassword,
        phoneNumber: editedPhoneNumber,
      });
      console.log("res of signup==>>>>>", res);
      onClose(); 
    } catch (error) {
      console.log("error raised");
      console.log(error);
      if (error.errorMessage === "Email already in use.") {
        showError("Sorry Email already in use. ");
      }
    }
  }
};

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
                <TextInputWithLable
                    label="User name"
                    placheHolder="Enter name"
                    value={editedName} 
                    onChangeText={(text) => setEditedName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Email"
                    placheHolder="enter email"
                    value={editedEmail} 
                    onChangeText={(text) => setEditedEmail(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="phoneNumber"
                    placheHolder="enter phone Number"
                   value={editedPhoneNumber} 
                   onChangeText={(text) => setEditedPhoneNumber(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Password"
                    placheHolder="enter password"
                    value={editedPassword} 
                    secureTextEntry={true} 
                    onChangeText={(text) => setEditedPassword(text)}
                />
            </View>

              <View style={styles.buttonContainer}>
                <ModalButton
                    text="Edit"
                    onPress={onEdit}
                  
                />
            </View>
        </View>
      </View>
    </Modal>
  );
};
export default EditAdminModal;

const styles = StyleSheet.create({
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
         imageStyle: {
        width: '30%',
        height: windowHeight * 0.08,
        left:windowWidth*0.25,
        
    },
    buttonContainer:{
      left:windowWidth*0.25,
    },
});