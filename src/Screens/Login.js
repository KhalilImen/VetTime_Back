import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image,Dimensions,KeyboardAvoidingView, Platform,ScrollView} from 'react-native';
import ButtonWithLoader from '../Components/ButtonWithLoader';
import TextInputWithLable from '../Components/TextInputWithLabel';
import validator from '../utils/validations';
import { showError } from '../utils/helperFunction';
import actions from '../redux/actions';
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Login = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        isSecure: true
        
    })
    const { isLoading, email, password, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            email,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

const onLogin = async () => {
    const checkValid = isValidData()
    if (checkValid) {
        updateState({ isLoading: true })
        try {
            const res = await actions.login({
                email,
                password
            })
            
            console.log("res==>>>>>", res)
            
            const role = res.user.role; 
            if (role === 'Client') {
                const user = res.user;
                console.log("User Data !!!!!!: ", user);
                 console.log("User Data !!!!!!: ", user.id);
                navigation.navigate('HomeIntermediaire');
            } else if (role === 'supAdmin') {
                navigation.navigate('HomeSupAdmin');
            } else if (role === 'Admin') {
                navigation.navigate('HomeAdmin');}
            else if (role === 'Agent') {
                navigation.navigate('HomeAgent');}
            else { 
                
                showError("Invalid role detected!");
            }

            updateState({ isLoading: false })
        } catch (error) {
            console.log("error raised")
            console.log(error)
              if (error.errorMessage === "User Doesn't Exist") {
                showError("please SignUp first ");
                } else if(error.errorMessage === "Wrong Username/Email and Password Combination!") {
                showError("Check your Email or password please ! ");
                }
                updateState({ isLoading: false })
        }
    }
}

     return (
  
        <SafeAreaView style={styles.container}>
              <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled" 
      >
            <Image
                source={require('../../assets/Login.png')}
                resizeMode="contain"
                style={styles.imageStyle1}
            />
            <Text style={styles.titleStyle}>Welcome Back!</Text>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    placheHolder="Email"
                    onChangeText={(email) => updateState({ email })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    placheHolder="Password"
                    isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(password) => updateState({ password })}
                />
            </View>

            <View style={styles.buttonContainer}>
                <ButtonWithLoader
                    text="Login"
                    onPress={onLogin}
                    isLoading={isLoading}
                />
            </View>
   <Text style={styles.text2}></Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPswd')}>
                <Text style={styles.text1}>Forgot Password?</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.text1}>Create an account</Text>
            </TouchableWithoutFeedback>
<Text style={styles.text}></Text>
            <Image
                source={require('../../assets/Union.png')}
                resizeMode="contain"
                style={styles.imageStyle2}
            />
            </ScrollView>
        </SafeAreaView>
  
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(56, 186, 184, 0.57)',
  },
  scrollContainer: {
    padding: windowWidth * 0.05,
    flexGrow: 1,
    justifyContent: 'center', 
  },
    imageStyle1: {
        width: '20%',
        height: windowHeight * 0.15, 
    },
     imageStyle2: {
        position: 'absolute',
        top: windowHeight* 0.70, 
        left: 0, 
        width: windowWidth * 0.75, 
        height: windowHeight * 0.39 
    },
    titleStyle: {
        marginTop: windowHeight * 0.05,
        color: "#FFF",
        fontSize: windowWidth * 0.1, 
        fontWeight: '700',
    },
    inputContainer: {
        marginTop: windowHeight * 0.06,
    },
    buttonContainer: {
        marginLeft: windowWidth * 0.2,
        marginTop: windowHeight * 0.01,
    },
    text: {
        color: "gray",
        marginLeft: windowWidth * 0.5,
        marginTop: windowHeight * 0.09,
    },
        text1: {
        color: "gray",
        marginLeft: windowWidth * 0.5,
        marginTop: windowHeight * 0.04,
    },
});

export default Login;


