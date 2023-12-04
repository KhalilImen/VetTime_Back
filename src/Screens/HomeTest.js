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
import SortMenu from "../Components/sortMenu";
import COLORS from '../consts/colors';
import CategoryList from "../Components/CategoryList";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupLoginModal from "./SignupLoginModal";
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import UpdateLocationButton from "../Components/UpdateLocationButton"
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import { useSelector } from "react-redux";
import InfoAdminModal from "./SearchScreens/InfoAdminModal";
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
const ListItem = ({ name,phoneNumber, active,Pic,email,password,id,onClose, onDelete, isActive, Activate, DesActivate,defaultProfilePic,Rate,navigation ,AdminId,joinDate}) => {
   // console.log("this is the email ",email)
   // console.log ("This is the specific ID ",id)
    const profilePic = Pic ? { uri: Pic } : defaultProfilePic;
 /***********Used to controle the color of button on activation and desactivation *************/

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [like, setLike] = useState('0');
  //  console.log("THIS IS THE LOGGGGGG",like)
const Like = async () => {
  const adminId = AdminId;
  const clientId = id;
  console.log("THIS IS THE ADMIN ID", adminId);
  console.log("THIS IS THE CLIENT ID", clientId);

  try {
    console.log("Sending Like request...");
    const response = await actions.Liked({ adminId, clientId });
    console.log("Received response:", response);

    // Check if the response contains the expected 'likeValue' property
    if (response && response.likeValue !== undefined) {
      setLike(response.likeValue);
      console.log("Updated LIKE VALUE", response.likeValue);
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error('Error Like:', error);
    setIsPressed(false); // Reset the button state on error.
  }
};

    useEffect(() => {Like();}, []);

  const openModal = () => {
    setIsModalVisible(true);
  };
    const openMessage = () => {
    navigation.navigate('ClientMessageScreen', { currentVetID: id, currentVetEmail:email });
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



    const PressLike = async () => {
      const adminId = AdminId;
      const clientId = id;
    try {
      await actions.AddLike({adminId,clientId});
      Like();
    } catch (error) {
      console.error('Error toggling admin Like:', error);
      setIsPressed(false); // Reset the button state on error.
    }
  };


  return (
      <TouchableOpacity onPress={openModal}>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end'}}>
           <TouchableOpacity  onPress={PressLike}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 
              
                  like === 1 ? COLORS.pastelRed : 'rgba(0,0,0,0.2)',
              }}>
             
              <Icon
                name="favorite"
                size={18}
                color={like === 1 ? 'red' : COLORS.black}
              />
           
            
              
            </View>
            </TouchableOpacity>

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
            <TouchableOpacity  onPress={openMessage}>
            <View
              style={{
                height: 25,
                width: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                   <AntDesign
          name="aliwangwang-o1"
          size={25}
          color={COLORS.blue} 
         
        />
              
            </View>
    </TouchableOpacity>
          </View>
        <Text style={{fontSize: 15, fontWeight: 'bold' , color:AvailabilityColor}}>
              {Availability}
            </Text>
        </View>
        <InfoAdminModal
        visible={isModalVisible}
        onClose={() =>setIsModalVisible(false)}
        onSave={() =>setIsModalVisible(false)}
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        id={id}
        joinDate={joinDate}
      
      /> 
      </TouchableOpacity>
      
      
    );

};

class HomeTest extends Component {
                                    
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
      data: this.props.userData.user.id,
      errorMsg: null,
      like:false,
      isSortModalVisible: false,
      
      
    };
    this.arrayholder = [];
    console.log("THIS IS DATA",this.state.data)
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
   // console.log(res);

    // Check if there are admins to display
    if (admins.length === 0) {
      this.setState({ adminData: [], sortedAdminData: [], error: null });
    } else {
      this.arrayholder = admins; // Update arrayholder
      this.setState({ adminData: admins });
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
    } catch (error) {
      console.error('Error removing admin item:', error);
    }
      }
/**********************Activate Admin********************************/
    async ActivateAdminItem(id) {
    try {
      
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.ActivateAdmin(id);
    } catch (error) {
      console.error('Error activating admin item:', error);
    }
    }
/**********************desActivate Admin********************************/
  async DesActivateAdminItem(id) {
    try {
      //console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DesActivateAdmin(id);

      
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
      //console.log(this.arrayholder);
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
   // console.log("THIS IS THE LALTITUDE IN GETNEAREST",latitude)
   // console.log("THIS IS THE LONGITUDE IN GETNEAREST",longitude)
   
    this.setState({latitude:latitude});
    this.setState({longitude:longitude});
       const response = await actions.ShowNearestVet({ latitude, longitude });
      // console.log("THIS IS THE RESPONSE IN getNearestAdmins",response )
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

    console.log("THIS IS THE RESPONSE IN getNearestAdmins of ",nearestAdmins)
    // Merge nearestAdmins with existing adminData if needed


 this.setState({
  nearestAdmins,
  adminData: nearestAdmins, // Replace adminData with the new data
  sortedAdminData: nearestAdmins, // Also set sortedAdminData to the new data
  currentSortCriteria: 'NEAREST',
  isPressed: true,
});

    //console.log('Nearest Admins:', nearestAdmins);
  } catch (error) {
    console.error('Error getting nearest admins:', error);
  }
};

/**********************Add raiting *********************/
    async Rate(id) {
    try {
    const AdminId = id
    const rating = 1
     const res = await actions.UpdateAdmin_Rating({rating,AdminId});
     this.setState({ like: true });
      
    } catch (error) {
      console.error('Error rating :', error);
    }
    }

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
      Rate={() => this.Rate(item.id)}
      like={this.state.like}
      navigation ={this.props.navigation}
      AdminId={this.state.data}
      joinDate={item.user.createdAt}
    />
  );
};


/************************Open sorting modal **********************************/
  toggleSortModal = () => {
    this.setState({ isSortModalVisible: !this.state.isSortModalVisible });
  };

  // Add a function to handle sorting by an option
  handleSortByOption = (option) => {
    this.toggleSortModal();
  };

  render() {
  const { isSortModalVisible } = this.state;
  const {isNearestSelected, adminData, sortedAdminData, loading, currentSortCriteria,filteredAdminData,location, errorMsg,isPressed,goLogin,goSignUp} = this.state;
      let dataToRender;
      if (currentSortCriteria === 'POPULAR') {
      dataToRender = sortedAdminData;
      } else if (currentSortCriteria === 'NEAREST') {
      console.log('Sorted by locationn !!!!!!!:', sortedAdminData);
      dataToRender = sortedAdminData;
      console.log('THIS IS THE DATA TO RENDER !!!!!!!:',dataToRender);
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
        {/* <TouchableOpacity  onPress={this.toggleSortModal}>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
        </TouchableOpacity> */}
      </View>

        <SortMenu
          visible={isSortModalVisible}
          animationType="slide"
          transparent={true}
          onClose={()=>this.setState({ isSortModalVisible: !this.state.isSortModalVisible })}
        />

      
 <CategoryList buttonData={buttonData} onCategorySelect={this.handleCategorySelect} />

    {isNearestSelected ? ( 
      <View>

        
        <TouchableOpacity onPress={() => this.getNearestAdmins(location.coords.latitude, location.coords.longitude)} style={styles.btnStyle}>
          <Text style={styles.textStyle}>Update your location first</Text>
        </TouchableOpacity>
        
 
        {    (dataToRender.length > 0 ? (
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
      
      }
      </View>
    ) : (
    
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

export default HomeTest;

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
      sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 40,
    borderRadius: 10,
    backgroundColor: COLORS.green,
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





