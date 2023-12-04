import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,Image, Dimensions } from 'react-native';
import ButtonWithLoader from '../Components/ButtonWithLoader';
const { width, height } = Dimensions.get('window');
const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
         <Image style={styles.imageStyle}
                source={require('../../assets/Login.png')} // Update with the actual image source
               
            />
                     <Image style={styles.cloud}
                source={require('../../assets/UnionS.png')} // Update with the actual image source
               
            />
            <Text style={styles.TitleStyle}>Let’s Get Started</Text>
           
             <Image style={styles.dog}
                source={require('../../assets/dog.png')} // Update with the actual image source
               
            />

  





          <View style={styles.buttonContainer}>  
           <ButtonWithLoader
                text="Begin"
                onPress={() => navigation.navigate('HomeGuest')}
             
            />
            </View>
                
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(56, 186, 184, 0.57)',
  },
  imageStyle: {
    position: 'absolute',
    top:height * 0.07,
    left: width * 0.04,
  },
  TitleStyle: {
    lineHeight: 100,
    color: '#FFF',
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop:height * 0.1,
    fontSize: 100, // Use a percentage of screen width for font size
    marginBottom: height * 0.002, // Use a percentage of screen height for margin
  },
  cloud: {
    width: width * 1.03, // Use a percentage of screen width for image width
    height: height * 0.4, // Use a percentage of screen height for image height
    position: 'absolute',
    top: height * 0, // Use a percentage of screen height for positioning
    left: width * 0.2, // Use a percentage of screen width for positioning
  },
  dog: {
    width: width * 0.4,
    height: height * 0.2,
    position: 'absolute',
    bottom: height * 0.20,
    right: width * 0.3,
  },
  buttonContainer: {
    marginTop: height * 0.25,
  },
});


export default Welcome;