import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView ,FlatList,Dimensions, Image, Modal } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalWhiteButton from "./ModalWhiteButton";
import { useNavigation } from '@react-navigation/native';
import COLORS from "../consts/colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');
const modalWidth = 300; // Set your modal width
const modalHeight = 155; 

const SortMenu = ({visible,onClose}) => {

  return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>


              <Text style={styles.Text1}>Oups first you have to </Text>

              <View style={styles.buttonContainer}>
                <ModalWhiteButton
                    text="Login"
                
                />
 
            </View>
                <Text style={styles.Text2}>or</Text>
                          <View style={styles.buttonContainer}>
                <ModalWhiteButton
                    text="SignUp"
                    
                />
             
            </View>
        </View>
      </View>
    </Modal>
  );
};
export default SortMenu;

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
     backgroundColor:COLORS.pastelRed,
    width: modalWidth,
    height: modalHeight,
    borderRadius: 10,
    padding: 20,
 
  
  },
    actionIcon: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C9999',
    marginLeft: 20,
    marginTop:6,
    borderRadius: 15,
  },

  Text1:{
    left:windowWidth*0.10,
     bottom: windowHeight*0.02,
     color:COLORS.white,
     fontWeight: 'bold',
     fontSize: 20
   
  },
    Text2:{
    left:windowWidth*0.3,
     bottom: windowHeight*0.01,
     color:COLORS.white,
     fontWeight: 'bold',
     fontSize: 20
   
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

      left:windowWidth*0.18,
       flexDirection: 'row',
       bottom: windowHeight*0.01,
    },
});