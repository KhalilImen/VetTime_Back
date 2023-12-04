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

const AddClientModal = ({ modalVisible, toggleModal,supAdminId,onCloseModal}) => {



         const [state, setState] = useState({
        isLoading: false,
        userName: '',
        email: '',
        password: '',
        phoneNumber:'',
        isSecure: true
    })
    const { isLoading, userName, email, password,phoneNumber,isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            userName,
            email,
            password

        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onAdd = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })
            try {
              console.log(supAdminId)
              console.log(phoneNumber)
                const res = await actions.AddClient({
                    email,
                    name: userName,
                    password,
                    SupAdminId:supAdminId,
                    phoneNumber
                   
                })
                console.log("res of signup==>>>>>", res)
                updateState({ isLoading: false })
                onCloseModal();
                
            } catch (error) {
            console.log("error raised")
            console.log(error)
              if (error.errorMessage === "Email already in use.") {
                showError("Sorry Email already in use. ");
                } 
                updateState({ isLoading: false })
        }
        }
    }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCloseModal}
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
                    onChangeText={(userName) => updateState({ userName })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Email"
                    placheHolder="enter email"
                    onChangeText={(email) => updateState({ email })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="phoneNumber"
                    placheHolder="enter phone Number"
                    onChangeText={(phoneNumber) => updateState({ phoneNumber })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Password"
                    placheHolder="enter password"
                    secureTextEntry={isSecure}
                    onChangeText={(password) => updateState({ password })}
                />
            </View>

              <View style={styles.buttonContainer}>
                <ModalButton
                    text="Add"
                    onPress={onAdd}
                    isLoading={isLoading}
                />
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddClientModal;

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