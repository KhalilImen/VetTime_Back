import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView ,FlatList,Dimensions, Image, Modal ,ImageBackground} from "react-native";
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
const modalWidth = 350; 
const modalHeight = 300; 

const AddRecetteModal= ({ visible, onSave,id,onClose}) => {

         const [state, setState] = useState({
        isLoading: false,
        depense: '',
        revenu: '',
        avance:''
    })
    useEffect(() => {
  if (visible) {
    setState({
        isLoading: false,
        depense: '',
        revenu: '',
        avance:''
    });
  }
}, [visible]);

    const { isLoading,depense,revenu,avance} = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))



    const onAdd = async () => {
        
      
            try {

                const res = await actions.AddRecette({
              depense,
              revenu,
              avance,
              interId :id,
                   
                })
                console.log("res of adding Recette==>>>>>", res)
                
                updateState({ isLoading: false })
                onClose();
                
            } catch (error) {
            console.log("error raised")
            console.log(error)
              if (error.errorMessage === "Enter All Fields!") {
                showError("Fill all fields please ! ");
                } 
                updateState({ isLoading: false })
        }
        
    }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
            <ImageBackground
        source={require('../../../assets/money.png')}
        style={styles.modalContent}
      >
        <View style={styles.overlay}>
          <Image
               source={require('../../../assets/logoBlue.png')}
                resizeMode="contain"
                style={styles.imageStyle}
            />
        
            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="depense"
                    placheHolder="depense"
                    onChangeText={(text) => updateState({ depense: text })}
                />
            </View>

            <View style={styles.inputContainer}> 
                <TextInputWithLable
                    label="revenu"
                    placheHolder="revenu"
                    onChangeText={(text) => updateState({ revenu: text })}
                />
            </View>
                       <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="avance"
                    placheHolder="avance"
                    onChangeText={(text) => updateState({ avance: text })}
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
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default AddRecetteModal;

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
  inputContainer:{
bottom:windowHeight*0.04,

  },
         imageStyle: {
        width: '30%',
        height: windowHeight * 0.08,
        left:windowWidth*0.65,
       
        
    },
    buttonContainer:{
      left:windowWidth*0.3,
      bottom:windowHeight*0.04,
    },
      overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust opacity here (0.5 for semi-transparent)
  },
});