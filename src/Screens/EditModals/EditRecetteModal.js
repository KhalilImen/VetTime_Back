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
import actions from "../../redux/actions";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');
const modalWidth = 350; 
const modalHeight = 300; 

const EditRecetteModal = ({ visible, onClose, onSave,id}) => {
    const [depense, setDepense] = useState('');
  const [revenu, setRevenu] = useState('');
  const [avance, setAvance] = useState('');
    const [editeddepense, setEditeddepense] = useState(depense);
  const [editedrevenu, setEditedrevenu] = useState(revenu);
  const [editedavance, setEditedavance] = useState(avance);

  const [depensePlaceholder, setdepensePlaceholder] = useState('');
  const [revenuPlaceholder, setrevenuPlaceholder] = useState('');
  const [avancePlaceholder, setavancePlaceholder] = useState('');

  const fetchData = async () => {
    try {
      const interId=id;
      const response = await actions.Recette_Exist(interId);
      console.log("API Response:§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§", response);

      if ('visit' in response) {
     setDepense(response.visit.depense);
  setRevenu(response.visit.revenu);
  setAvance(response.visit.avance);
  setEditeddepense(response.visit.depense); 
  setEditedrevenu(response.visit.revenu); 
  setEditedavance(response.visit.avance);   

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



  const onEdit = async () => {
    try {
      const res = await actions.EditRecette({
        interId: id,
        depense: editeddepense,
        revenu: editedrevenu,
        avance: editedavance,
      });
      console.log("Edit Response:", res);
      onClose();
    } catch (error) {
      console.error("Error editing data:", error);
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
                    label="User name"
                    placheHolder={depensePlaceholder}
                    value={editeddepense} 
                    onChangeText={(text) => setEditeddepense(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Email"
                    placheHolder={revenuPlaceholder}
                    value={editedrevenu} 
                    onChangeText={(text) => setEditedrevenu(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Password"
                    placheHolder={avancePlaceholder}
                    value={editedavance} 
                    
                    onChangeText={(text) => setEditedavance(text)}
                />
            </View>

              <View style={styles.buttonContainer}>
                <ModalButton
                    text="Edit"
                    onPress={onEdit}
                  
                />
            </View>
        </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default EditRecetteModal;

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