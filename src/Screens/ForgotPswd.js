import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image,Dimensions, KeyboardAvoidingView } from 'react-native';
import ButtonWithLoader from '../Components/ButtonWithLoader';
import TextInputWithLable from '../Components/TextInputWithLabel';
import validator from '../utils/validations';
import { showError } from '../utils/helperFunction';
import actions from '../redux/actions';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const ForgotPswd = ({ navigation }) => {
    const userData = useSelector((state)=> state.auth.userData)
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        isSecure: true
    })
    const { isLoading, email, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            email,
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

const onSubmit = async () => {
    const checkValid = isValidData()
    if (checkValid) {
        updateState({ isLoading: true })
        try {
            const res = await actions.ForgotPswd({
                id: userData.user.id,
                email
            })

            console.log("res==>>>>>", res)

            updateState({ isLoading: false })
        } catch (error) {
            console.log("error raised")
            console.log(error)
              if (error.errorMessage === "User Doesn't Exist") {
                showError("Enter a registered email ");
                } 
                updateState({ isLoading: false })
        }
    } 
}

      return (
       <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -windowHeight * 0.2} 
        enabled
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">

    <Image
                source={require('../../assets/Login.png')}
                resizeMode="contain"
                style={styles.imageStyle}
            />
            <Text style={styles.titleStyle}>Forgot your Password?</Text>
            <Text style={styles.subtitleStyle}>Enter your registered email below</Text>

            <View style={styles.inputContainer}>
                <TextInputWithLable
                    placheHolder="Email"
                    onChangeText={(email) => updateState({ email })}
                />
            </View>
                    <View style={styles.inputContainer}></View>
            <View style={styles.buttonContainer}>
                <ButtonWithLoader
                    text="Submit"
                    onPress={onSubmit}
                    isLoading={isLoading}
                />
            </View>
            <View style={styles.inputContainer}></View>
            <View style={styles.inputContainer}></View>

            <Image
                source={require('../../assets/Union.png')}
                resizeMode="contain"
                style={styles.imageStyle2}
            />
        </ScrollView>
      </KeyboardAvoidingView>
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
    flexGrow: 1, // Allow content to grow when keyboard is open
    justifyContent: 'center', // Center content vertically
      height: windowHeight * 1.04,
  },
    imageStyle: {
          width: '20%',
        height: windowHeight * 0.15,
    },
    titleStyle: {
        marginLeft: windowWidth * 0.02,
        marginTop: windowHeight * 0.02,
        color: "#FFF",
        fontSize: windowWidth * 0.08,
        fontWeight: '800',
    },
    subtitleStyle: {
        marginLeft: windowWidth * 0.02,
        marginTop: windowHeight * 0.015,
        color: 'rgba(255, 255, 255, 0.80)',
        fontSize: windowWidth * 0.05,
        fontWeight: '300',
    },
    inputContainer: {
        marginTop: windowHeight * 0.09,
    },
    buttonContainer: {
        marginLeft: windowWidth * 0.2,
        marginTop: windowHeight * 0.04,
    },
    imageStyle2: {
        position: 'absolute', // Position the image absolutely
        bottom: 0, // Place it at the bottom
        left: 0, // Place it at the left
        width: windowWidth * 0.60, // Adjust the width based on your preference
        height: windowHeight * 0.32, // Adjust the height based on your preference
    },
});

export default ForgotPswd;