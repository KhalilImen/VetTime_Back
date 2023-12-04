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
import { Picker } from "react-native-web";
import DropDown from "../../Components/DropDown";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get('window');
const modalWidth = 350; 
const modalHeight = 570; 

const AddInterventionModal = ({ modalVisible, toggleModal,VisitId,AdminId,onCloseModal}) => {
  console.log("This is add intervention admin Id ",AdminId)

         const [state, setState] = useState({
        isLoading: false,
        lieu: '',
        type: '',
        refAnimal: '',
        quantityOfAnimals:'',
        rapport:'',
        AgentId:'',
        AgentData:[],//the data I'm passing to the dropdown to select an agent 
        isSecure: true
    })
    console.log("Add intervention agent data ",state.AgentData)
    const { isLoading, lieu, type, refAnimal,quantityOfAnimals,rapport,isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))

    /*Types to pass to drop down of types */
      const type_intervention = [
    { label: 'Vaccine', value: '1' },
    { label: 'Casual Visit', value: '2' },
    { label: 'Type3', value: '3' },
    { label: 'Type4', value: '4' },
    { label: 'Type 5', value: '5' },

  ];

  /*List of agents you have to pass to agent drop down  */


    const adminId = AdminId;

     // Fetch AgentData when the component initializes
  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await actions.ShowAllAgents(adminId);
        if (response && response.Agent) {
          const agentData = response.Agent.map(agent => ({
            label: agent.user.name,
            value: agent.id.toString(),
          }));
          setState(prevState => ({
            ...prevState,
            AgentData: agentData,
          }));
        } else {
          console.log('No agents found for adminId:', AdminId);
        }
      } catch (error) {
        console.error('Error fetching AgentData:', error);
      }
    };

    fetchAgentData();
  }, []); // Run this effect once when the component initializes

  console.log("Passed AGENT data: ", state.AgentData);

 



  const [selectedType, setSelectedType] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  console.log("THIS IS THE SELEVTED TYPE",selectedType);
  console.log("THIS IS THE SELEVTED AGENT",selectedAgent);

    const onAdd = async () => {
            try {
              console.log("this is the visit id in add intervention",VisitId)
          
                const res = await actions.AddIntervention({
                   lieu,  
                   type:selectedType, 
                   refAnimal, 
                   quantityOfAnimals ,
                   rapport,
                   AgentId :selectedAgent, 
                   VisitId :VisitId 
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
                    label="Location"
                    placheHolder="Location"
                    onChangeText={(lieu) => updateState({ lieu })}
                />
            </View>



            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="refAnimal"
                    placheHolder="refAnimal"
                    onChangeText={(refAnimal) => updateState({ refAnimal })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="quantityOfAnimals"
                    placheHolder=" Enter quantity Of Animals"
                    
                    onChangeText={(quantityOfAnimals) => updateState({ quantityOfAnimals})}
                />
            </View>
                        <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="note"
                    placheHolder=" Add a note if you want"
                    onChangeText={(rapport) => updateState({ rapport})}
                />
            </View>
                      <View style={styles.inputContainer}>
                      <DropDown types={type_intervention} selectedValue={selectedType} onSelect={setSelectedType} isAgentDropdown={false} /> 
                      </View>
                                    <View style={styles.inputContainer}>
                      <DropDown types={state.AgentData} selectedValue={selectedAgent} onSelect={setSelectedAgent} isAgentDropdown={true} /> 
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

export default AddInterventionModal;

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