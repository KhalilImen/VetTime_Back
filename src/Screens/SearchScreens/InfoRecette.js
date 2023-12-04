import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView ,FlatList,Dimensions, Image, Modal, ImageBackground } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

import ModalButton from "../../Components/ModalButton";
import TextInputWithLable from '../../Components/TextInputWithLabel';
import validator from '../../utils/validations';
import { showError } from '../../utils/helperFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import ZigzagView from "react-native-zigzag-view"
import actions from "../../redux/actions";
import COLORS from "../../consts/colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');
const modalWidth = 330; 
const modalHeight = 170; 

const InfoRecette = ({ visible, onClose, onSave,id}) => {

  const [depensePlaceholder, setdepensePlaceholder] = useState('');
  const [revenuPlaceholder, setrevenuPlaceholder] = useState('');
  const [avancePlaceholder, setavancePlaceholder] = useState('');

  const fetchData = async () => {
    try {
      const interId=id;
      const response = await actions.Recette_Exist(interId);
      console.log("API Response:§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§", response);

      if ('visit' in response) { 

  setdepensePlaceholder(response.visit.depense.toString()); 
  setrevenuPlaceholder(response.visit.revenu.toString());   
  setavancePlaceholder(response.visit.avance.toString());   
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible, id]);


  return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
     onRequestClose={onClose}
    >
      <View style={[styles.modalContainer]}>
                  <ImageBackground
        source={require('../../../assets/money2.jpg')}
        style={styles.modalContent}
      >
        <View style={styles.overlay}>

          <Image
                style={styles.imageStyle}
            />
        
            <View style={styles.inputContainer}>
            <View ><Text style={styles.text} >Depenses</Text></View>
            
            <Text  style={styles.text} >{depensePlaceholder}</Text>
            </View>

            <View style={styles.inputContainer}>
            <Text  style={styles.text} >revenue</Text>
            <Text  style={styles.text} >{revenuPlaceholder}</Text>
            </View>

            <View style={styles.inputContainer}>
            <Text  style={styles.text} >advance</Text> 
            <Text  style={styles.text} >{avancePlaceholder}</Text>
            </View>

        </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default InfoRecette;

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
    backgroundColor: 'rgba(225,225,225, 0.7)',
     borderRadius: 40,
    padding: 20,

 
  
  },
    text:{
            fontSize: 18,
        fontWeight: 'light',
        color: COLORS.gray,

  },
  inputContainer:{
    flexDirection:'row',
    top:windowHeight*0.04,
    left:windowWidth*0.3,

  },

      overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.87)',
        
  },
});