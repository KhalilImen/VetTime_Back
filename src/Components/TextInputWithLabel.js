import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import COLORS from '../consts/colors';

const TextInputWithLable = ({

    value,
    placheHolder,
    isSecure,
    onChangeText,
    ...props
}) => {
    return (
        <View style={{marginBottom: 16}}>

            <TextInput
                value={value}
                placeholder={placheHolder}
                onChangeText={onChangeText}
                style={styles.inputStyle}
                placeholderTextColor={COLORS.gray}
                selectionColor={COLORS.gray}
                {...props}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        borderBottomWidth: 1, 
        borderColor: COLORS.gray,
        color: COLORS.dark,
        paddingHorizontal: 16
    }
});

export default TextInputWithLable;