import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,Dimensions } from 'react-native';
import COLORS from '../consts/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// create a component
const ButtonContact = ({
    isLoading,
    text,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btnStyle}>

            {!!isLoading ? <ActivityIndicator size="large" color="white" />
                : <Text style={styles.textStyle}>{text}</Text>
            }
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnStyle: {
     backgroundColor:COLORS.white,
        opacity:1,
        width: 100,
        borderWidth: 2,
        height: 40,
         borderColor:COLORS.blue,
          alignItems: 'center',
       
    },
    textStyle: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.blue,
        marginTop:windowHeight*0.01
        
    },
});

//make this component available to the app
export default ButtonContact;