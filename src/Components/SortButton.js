//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../consts/colors';

// create a component
const SortButton = ({
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
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor:COLORS.blue,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    textStyle: {
        fontSize: 17,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.gray,
    },
});

//make this component available to the app
export default SortButton;