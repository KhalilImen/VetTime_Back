import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import ButtonWithLoader from '../Components/ButtonWithLoader';
import TextInputWithLable from '../Components/TextInputWithLabel';
import validator from '../utils/validations';
import { showError } from '../utils/helperFunction';
import actions from '../redux/actions';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const ResetPswd = ({ navigation }) => {
    const userData = useSelector((state)=> state.auth.userData)
    const [state, setState] = useState({
        isLoading: false,
       password: '',
        OldPassword:'',
        isSecure: true
    })
    const { isLoading, password, OldPassword, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
           password,
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
            const res = await actions.UpdatePswd({
                id: userData.user.id,
                password,
                OldPassword
            })
            console.log("res==>>>>>", res)
             navigation.navigate('Home')
            updateState({ isLoading: false })
        } catch (error) {
            console.log("error raised")
            console.log(error)
              if (error.errorMessage === "User not found") {
                showError("Unvalid password");
                } 
                if (error.errorMessage === "Wrong Old Password !") {
                showError("Wrong Old Password !");
                } 
                updateState({ isLoading: false })
        }
    }
}

    return (
        <SafeAreaView style={styles.container}>
         <Image
                source={require('../../assets/Login.png')} 
            />
            <Text style={styles.TitleStyle}>Reset your Password</Text>
        <View style={{ marginTop : 40, marginBottom: 45 }}>
              <TextInputWithLable
                placheHolder="Old Password"
                onChangeText={( OldPassword) => updateState({ OldPassword})}
            />
        </View>
        <View style={{ marginTop :0, marginBottom: 30 }}>
              <TextInputWithLable
                placheHolder="New Password"
                onChangeText={(password) => updateState({password })}
            />
        </View>
   
          <View style={{marginLeft : 70, marginTop:30}}>  
           <ButtonWithLoader
                text="Reset"
                onPress={onSubmit}
                isLoading={isLoading}
            />
            </View>
              
            <View style={{marginVertical: 8}} />
             <Image
                source={require('../../assets/Union.png')} 
                style={styles.imageStyle}
            />   
         
        
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        padding: 24,
     backgroundColor:'rgba(56, 186, 184, 0.57)'
    },
    imageStyle:{
      flex:1,
      marginLeft:-40,
      marginTop:-35,
      marginBottom:-26,
    }, 
    TitleStyle:{
      marginLeft:8,
      marginTop:100,
      color: "#FFF",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 36,
    },
       SubTitle:{
      marginLeft:8,
      marginTop:20,
    color: 'rgba(255, 255, 255, 0.80)',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 21,
    },

});


export default ResetPswd;