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
const modalHeight = 270; 

const AddVisitModal = ({ modalVisible, toggleModal,AdminId,ClientId,onCloseModal}) => {

         const [state, setState] = useState({
        isLoading: false,
        Name: '',
        Date: '',

    })
    useEffect(() => {
  if (modalVisible) {
    setState({
      isLoading: false,
      Name: '', 
      Date: '', 
    });
  }
}, [modalVisible]);

    const { isLoading, Name, Date,isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))



    const onAdd = async () => {
        
      
            try {

                const res = await actions.AddVisit({
                    AdminId,
                    ClientId,
                    Name,
                    Date,
                   
                })
                console.log("THIS IS CLIENTID!!!!!!!!!!",ClientId)
                console.log("res of adding visit==>>>>>", res)
                
                updateState({ isLoading: false })
                onCloseModal();
                
            } catch (error) {
            console.log("error raised")
            console.log(error)
              if (error.errorMessage === "Enter Date!") {
                showError("Insert Date first please . ");
                } 
                updateState({ isLoading: false })
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
                    label="Visit name"
                    placheHolder="Enter name"
                    onChangeText={(text) => updateState({ Name: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Date"
                    placheHolder="enter Date in this format : yyyy-mm-dd"
                    onChangeText={(text) => updateState({ Date: text })}
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

export default AddVisitModal;

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