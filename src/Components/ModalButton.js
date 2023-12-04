import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../consts/colors';

// create a component
const ModalButton = ({
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
        width: 120,
        height: 40,
        borderRadius: 5,
        backgroundColor:COLORS.blue,
        opacity:1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    textStyle: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.gray,
    },
});

//make this component available to the app
export default ModalButton;