import { View, Text, StyleSheet, Image,Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import StatTable from '../Components/StatTable';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DashboardAdmin() {
  return (
      <SafeAreaView style={styles.container}>
        <Image
        
                source={require('../../assets/logoBlue.png')} // Update with the actual image source
                resizeMode="cover"
                style={styles.imageStyle1}
               
            />
      <StatTable/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
     backgroundColor:'#F5F5F5'
    },
       imageStyle1: {
        width: '30%',
        height: windowHeight * 0.09,
        left:-30,
    },
    buttonContainer: {
        marginLeft: windowWidth * 0.5,
        marginTop: windowHeight * 0.04,
    },

});
export default DashboardAdmin;