import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,Image,Dimensions, KeyboardAvoidingView } from 'react-native';
import ButtonWithLoader from '../Components/ButtonWithLoader';
import TextInputWithLable from '../Components/TextInputWithLabel';
import validator from '../utils/validations';
import { showError } from '../utils/helperFunction';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import actions from '../redux/actions';
import {showMessage} from "react-native-flash-message"
import COLORS from '../consts/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SignUp = ({ navigation }) => {

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
            phoneNumber,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onSignup = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })
            try {
                const res = await actions.signup({
                    name: userName,
                    email,
                    phoneNumber,
                    password
                })
                console.log("res of signup==>>>>>", res)
                showMessage("Registered successfully...!!!! Please verify your email")
                updateState({ isLoading: false })
                navigation.navigate('Login')
                
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
        
        <SafeAreaView style={styles.container}>

            <Image
                source={require('../../assets/Login.png')}
                resizeMode="contain"
                style={styles.imageStyle}
            />
            <Image
                source={require('../../assets/UnionS.png')}
                resizeMode="contain"
                style={styles.cloud}
            />
            <Text style={styles.titleStyle}>Create New</Text>
            <Text style={styles.titleStyle2}>Account </Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="User name"
                    placheHolder="enter your user name"
                    onChangeText={(userName) => updateState({ userName })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Email"
                    placheHolder="enter your email"
                    onChangeText={(email) => updateState({ email })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="PhoneNumber"
                    placheHolder="enter your phone Number"
                    onChangeText={(phoneNumber) => updateState({ phoneNumber})}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    label="Password"
                    placheHolder="enter your password"
                    secureTextEntry={isSecure}
                    onChangeText={(password) => updateState({ password })}
                    
                />
            </View>

            <View style={styles.buttonContainer}>
                <ButtonWithLoader
                    text="Signup"
                    onPress={onSignup}
                    isLoading={isLoading}
                />
            </View>
            </ScrollView>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>already has an account</Text>
            </TouchableWithoutFeedback>
         
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.05,
        backgroundColor: 'rgba(56, 186, 184, 0.57)',
    },

    imageStyle: {
        width: '20%',
        height: windowHeight * 0.15,
        right: windowWidth * 0.01,
    },
    cloud: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        width: windowWidth * 0.70, 
        height: windowHeight * 0.33,

    },
    titleStyle: {
        marginTop: windowHeight * 0.02,
        color: "#FFF",
        right: windowWidth * 0.01,
        fontSize: windowWidth * 0.1,
        fontWeight: '700',
    },
    titleStyle2: {
        marginTop: windowHeight * 0,
        marginLeft: windowWidth * 0.40,
        color: "#FFF",
        fontSize: windowWidth * 0.1,
        fontWeight: '100',
    },
    inputContainer: {
        marginTop: windowHeight * 0.04,
    },
    buttonContainer: {
        marginLeft: windowWidth * 0.2,
        marginTop: windowHeight * 0.04,
        zIndex:4,
    },
    text: {
        color: "gray",
        marginLeft: windowWidth * 0.45,
        marginTop: windowHeight * 0.02,
    },
});


export default SignUp;