import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Dimensions, Image } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SortButton from "../Components/SortButton";
import actions from "../redux/actions";
import AddAdminModal from './AddModals/AddAdminModal';
import EditAdminModal from "./EditModals/EditAdminModal";
import COLORS from '../consts/colors';
import CategoryList from "../Components/CategoryList";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupLoginModal from "./SignupLoginModal";
import * as Location from 'expo-location';
import UpdateLocationButton from "../Components/UpdateLocationButton"
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const buttonData = [{
	id: "1",
	title: "All",
},
{
	id: "2",
	title: "POPULAR",
},
{
	id: "3",
	title: "NEAREST",
},
];
  
const Item = ({ name ,phoneNumber}) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
      <Text>{phoneNumber}</Text>
    </View>
  );
};


/******************Admin list design****************************/
const ListItem = ({ name,phoneNumber, active,Pic,email,password,id, onDelete, isActive, Activate, DesActivate,defaultProfilePic }) => {

const profilePic = Pic ? { uri: Pic } : defaultProfilePic;
 /***********Used to controle the color of button on activation and desactivation *************/

   const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };
   const [isPressed, setIsPressed] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
    const AvailabilityColor = active === 1 ? COLORS.green : COLORS.red;
   const Availability = active === 1 ? 'Available' : 'Not Available';
  const handlePress = async () => {
    try {
      setIsPressed(true); // Set the button as pressed immediately.

      if (isActive === 1) {
        await DesActivate(); // Deactivate the user.
      } else {
        await Activate(); // Activate the user.
      }
    } catch (error) {
      console.error('Error toggling admin activation:', error);
      setIsPressed(false); // Reset the button state on error.
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
    const handleSave = () => {
    // Perform the save action here
    setIsEditing(false);
  };

  return (
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end'}}>
           <TouchableOpacity  onPress={openModal}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 
                   'rgba(0,0,0,0.2) ',
              }}>
             
              <Icon
                name="favorite"
                size={18}
                color={COLORS.black}
              />
           
            
              
            </View>
            </TouchableOpacity>
                  <SignupLoginModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                />
          </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={profilePic}
              style={{flex: 1, resizeMode: 'contain'}}
            />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold' , color:COLORS.gray}}>
              {phoneNumber}
            </Text>
            <TouchableOpacity  onPress={openModal}>
            <View
              style={{
                height: 25,
                width: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="aliwangwang-o1" size={25} color={COLORS.blue} />
            </View>
    </TouchableOpacity>
          </View>
        <Text style={{fontSize: 15, fontWeight: 'bold' , color:AvailabilityColor}}>
              {Availability}
            </Text>
        </View>

      </TouchableOpacity>
      
    );

};




class HomeGuestTest extends Component {

                                        
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      adminData: [],
      sortedAdminData: [],
      filteredAdminData: [],
      nearestAdmins:[],
      modalVisible: false,
      error: null,
      searchValue: "",
      currentSortCriteria: null,
      isNearestSelected: false,
      location: null,
      isPressed : false,
      latitude:'',
      longitude:'',
      errorMsg: null,
      
      
    };
    this.arrayholder = [];
   
  }

navigateToLogin = ()=> {
  
  this.props.navigation.navigate('Login');
}
navigateToSignUp = ()=> {
  
  this.props.navigation.navigate('SignUp');
}
  /*************Function to render Admins in the page **************/
    async componentDidMount() {
        try {
    await this.fetchAdminData();
    this.getLocation(); 
   } catch (error) {
    // Handle the error
    console.error('Error fetching admin data:', error);
    this.setState({ adminData: [], sortedAdminData: [], error });
  }
      }
    async fetchAdminData() {

  try {
    const res = await actions.ShowAllAdmin({});
    const { admins } = res;

    // Check if there are admins to display
    if (admins.length === 0) {
      this.setState({ adminData: [], sortedAdminData: [], error: null });
    } else {
      this.arrayholder = admins; // Update arrayholder
      this.setState({ adminData: admins });

      // Update sortedAdminData as well if it's active
      if (this.state.sortedAdminData.length > 0) {
        const sortedAdminData = await actions.SortAdminByRating(); // Re-sort based on your sorting criteria
        this.setState({ sortedAdminData });
      }
    }
  } catch (error) {
    // Handle the error
    console.error('Error fetching admin data:', error);
    this.setState({ adminData: [], sortedAdminData: [], error });
  }
      }
    async componentDidUpdate(prevProps, prevState) {

  if (prevState.adminData !== this.state.adminData) {
    await this.fetchAdminData();
  }
      }

  /*************Function to delete Admin **************/
    async deleteAdminItem(id) {
    try {
   
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DeleteAdmin(id);

      // Update the displayed list and arrayholder
      const updatedAdminData = this.state.adminData.filter(item => item.id !== id);
      this.setState({ adminData: updatedAdminData });
      this.arrayholder = updatedAdminData;

      if (this.state.sortedAdminData.length > 0) {
      const sortedAdminData = await actions.SortAdminByRating(); // Re-sort based on your sorting criteria
      this.setState({ sortedAdminData });
    }
    } catch (error) {
      console.error('Error removing admin item:', error);
    }
      }
/**********************Activate Admin********************************/
    async ActivateAdminItem(id) {
    try {
    
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.ActivateAdmin(id);
    

         if (this.state.sortedAdminData.length > 0) {
      const sortedAdminData = await actions.SortAdminByRating(); // Re-sort based on your sorting criteria
      this.setState({ sortedAdminData });
    }
      
    } catch (error) {
      console.error('Error activating admin item:', error);
    }
    }
/**********************desActivate Admin********************************/
  async DesActivateAdminItem(id) {
    try {
   
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DesActivateAdmin(id);

         if (this.state.sortedAdminData.length > 0) {
      const sortedAdminData = await actions.SortAdminByRating(); // Re-sort based on your sorting criteria
      this.setState({ sortedAdminData });
    }

      // Update the color 
      
    } catch (error) {
      console.error('Error desactivating admin item:', error);
    }
    }

/*********************Handle the selection of admins ********************************/
  handleCategorySelect = (selectedCategory) => {
  // Do something with the selected category, for example, pass it to handleButtonPress
  this.handleButtonPress(selectedCategory);
}

/******************Sort Admins ***************************/
     async handleButtonPress(selectedCategory){
      
      if (selectedCategory !== 'NEAREST') {
      this.setState({ isNearestSelected: false });
    }
    
    if (selectedCategory === 'POPULAR') {
      
       try {
      const sortedAdminData = await actions.SortAdminByRating();
      this.setState({ sortedAdminData, currentSortCriteria: 'POPULAR' }); // Store the sorted data in the state
        } catch (error) {
    //console.error('Error getting most popular admins:', error);
  }
    }else if (selectedCategory === 'NEAREST') {
    this.setState({ isNearestSelected: true });

    
    if (this.state.isPressed === true) {
      const latitude = this.state.latitude;
      const longitude = this.state.longitude;

       try {
      // Call the getNearestAdmins function to fetch and set nearestAdmins data
      await this.getNearestAdmins(latitude, longitude); 
     } catch (error) {
    console.error('Error getting nearest admins:', error);
  }

      // Set sortedAdminData with the fetched nearestAdmins data
      const sortedAdminData = this.state.nearestAdmins;
      this.setState({sortedAdminData, currentSortCriteria: 'NEAREST'});
    }

    } else {
      await this.fetchAdminData();
      this.setState({ currentSortCriteria: null }); // Fetch unsorted data for other buttons
    }
    }
  /*****************Search Admin function ********************/
    searchFunction = (text) => {
   
  const updatedData = this.arrayholder.filter((item) => {
    const item_data = `${item.user.name.toUpperCase()}`;
    const text_data = text.toUpperCase();
    return item_data.indexOf(text_data) > -1;
  });
  this.setState({ filteredAdminData: updatedData, searchValue: text });
    };
  /*****************Add Admin function ********************/
    toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  handleModalClose = () => {
  this.setState({ modalVisible: false });
}
    /***************Get user location************ */
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMsg: 'Permission to access location was denied' });
    } else {
      this.updateLocation();
    }
  };
  updateLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (error) {
      this.setState({ errorMsg: 'Error getting location' });
    }
  };


  /*********************Get nearest vets**********************/

   getNearestAdmins = async (latitude, longitude) => {
  try {

    // Make an HTTP POST request to your backend endpoint
    this.setState({latitude:latitude});
    this.setState({longitude:longitude});
       const response = await actions.ShowNearestVet({ latitude, longitude });
      
    // Handle the response data and map it to match the format of your existing admin data
    const nearestAdmins = response.nearestAdmins.map((admin) => {
      return {
        id: admin.adminId,
        user: {
          name: admin.name,
          phoneNumber: admin.phoneNumber,
          active:admin.active,
          // Map other user properties as needed
        },
        rating: admin.rating,
        // Map other admin properties as needed
      };
    });

 
    // Merge nearestAdmins with existing adminData if needed


 this.setState({
  nearestAdmins,
  adminData: nearestAdmins, // Replace adminData with the new data
  sortedAdminData: nearestAdmins, // Also set sortedAdminData to the new data
  currentSortCriteria: 'NEAREST',
  isPressed: true,
});

  } catch (error) {
    console.error('Error getting nearest admins:', error);
  }
};



renderItem = ({ item }) => {


 
  const defaultProfilePic = require('../../assets/cat2.jpg'); 
  return (
    <ListItem
      name={item.user.name}
      phoneNumber={item.user.phoneNumber}
      Pic={item.user.Pic}
      email={item.user.email}
      password={item.user.password}
      active={item.user.active}
      id={item.user.id}
      defaultProfilePic={defaultProfilePic}
      onDelete={() => this.deleteAdminItem(item.id)}
      isActive={item.user.active}
      Activate={() => this.ActivateAdminItem(item.id)}
      DesActivate={() => this.DesActivateAdminItem(item.id)}
    />
  );
};

  render() {

  const {isNearestSelected, adminData, sortedAdminData, loading, currentSortCriteria,filteredAdminData,location, errorMsg,isPressed,goLogin,goSignUp} = this.state;

      let dataToRender;
      if (currentSortCriteria === 'POPULAR') {
      dataToRender = sortedAdminData;
      } else if (currentSortCriteria === 'NEAREST') {
   
      dataToRender = sortedAdminData;
     
      } else {
      dataToRender = this.state.searchValue ? filteredAdminData : adminData;
      }



  //if the I select all or Popular this is the screen that will be rendered 
  return (
   
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Welcome to</Text>
          <View style={{ flexDirection: 'row'}} >
          <Text style={{fontSize: 60, color: COLORS.blue, fontWeight: 'bold'}}>
            VETIME
          </Text>


                <Image
               source={require('../../assets/logoBlue.png')}
                resizeMode="contain"
                style={styles.imageStyle}
            />
            </View>
        </View>

      </View>
                <View style={styles.logSignContainer}>
                  <TouchableOpacity onPress={() => this.navigateToLogin()} style={styles.Login}>
            <Text style={styles.text1}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigateToSignUp()}  style={styles.SignUp}>
            <Text style={styles.text2}>SIGNUP</Text>
        </TouchableOpacity>
          </View>
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput      
            style={styles.searchInput}
            placeholder="Search Here..."
            value={this.state.searchValue}
            onChangeText={(text) => this.searchFunction(text)}
            autoCorrect={false} />
        </View>
      </View>
 <CategoryList buttonData={buttonData} onCategorySelect={this.handleCategorySelect} />

    {isNearestSelected ? ( // Render the button if "NEAREST" is selected
      <View>
        <TouchableOpacity onPress={() => this.getNearestAdmins(location.coords.latitude, location.coords.longitude)} style={styles.btnStyle}>
          <Text style={styles.textStyle}>Update your location first</Text>
        </TouchableOpacity>
        {dataToRender.length > 0 ? (
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 50,
            }}
            numColumns={2}
            data={dataToRender}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Image
            source={require('../../assets/Empty.png')}
            resizeMode="contain"
            style={styles.imageStyle1}
          />
        )}
      </View>
    ) : (
      // Render the FlatList if "NEAREST" is not selected
      (dataToRender.length > 0 ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={dataToRender}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Image
          source={require('../../assets/Empty.png')}
          resizeMode="contain"
          style={styles.imageStyle1}
        />
      ))
    )}
  </SafeAreaView>
   
  );
  }

}



export default HomeGuestTest;

const styles =StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  logSignContainer:{
    width: 80,
        flexDirection: 'row',
         marginTop: windowHeight*0.01,
         left: windowWidth*0.2,
          alignItems: 'center',
  },
  SignUp:{
     backgroundColor:COLORS.blue,
        opacity:1,
        width: 100,  
        height: 40,
         alignItems: 'center',
       
  },
    Login:{
     backgroundColor:COLORS.white,
        opacity:1,
        width: 100,
        borderWidth: 2,
        height: 40,
         borderColor:COLORS.blue,
          alignItems: 'center',
  },
  text1:{
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.blue,
        marginTop:windowHeight*0.01
        
      
  },
    text2:{
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.white,
        marginTop:windowHeight*0.01
  },
  imageStyle:{
     marginTop:-70,
     marginLeft:windowWidth*0.1,
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.blue,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.blue,
  },
  card: {
    height: 235,
    backgroundColor: COLORS.light,
    marginHorizontal: 4,
    borderRadius: 10,
    width:162,
    marginBottom: 20,
    padding: 15,
    
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
    btnStyle: {
        width: 330,
        height: 50,
        borderRadius: 5,
        backgroundColor:COLORS.blue,
        opacity:1,
        marginLeft : windowWidth*0.02,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    textStyle: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'light',
        color: COLORS.gray,
    },
      imageStyle1:{
        bottom: windowHeight * 0.01,
        right:windowWidth*0.35
  },
});





