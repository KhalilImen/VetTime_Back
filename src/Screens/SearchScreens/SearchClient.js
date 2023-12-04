import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Dimensions, Image } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SortButton from "../../Components/SortButton";
import actions from "../../redux/actions";
import AddClientModal from '../AddModals/AddClientModal';
import EditClientModal from "../EditModals/EditClientModal";
import InfoClientModal from "./InfoClientModal";
import COLORS from "../../consts/colors";
import CategoryList from "../../Components/CategoryList";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import * as Location from 'expo-location';
import UpdateLocationButton from "../../Components/UpdateLocationButton"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const buttonData = [{
	id: "1",
	title: "All",
},
{
	id: "2",
	title: "This week Clients",
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

/******************Client list design****************************/
const ListItem = ({ name,phoneNumber, Pic,email,password,id, onDelete, isActive,defaultProfilePic, Activate, DesActivate, AdminId,joinDate }) => {


   const [isEditing, setIsEditing] = useState(false);
  const [isConsulting, setisConsulting] = useState(false);

  const profilePic = Pic ? { uri: Pic } : defaultProfilePic;
 
  const handleEdit = () => {
    setIsEditing(true);
  };
    const handleSave = () => {
   
    setIsEditing(false);
  };
    const handleConsult = () => {
    setisConsulting(true);
  };

  return (
   
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
     <Image  source={profilePic} style={styles.image} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: 'black',
            left:20,
            
             }}>
          {name}
        </Text>
            <Text
          style={{
            fontWeight: 'light',
            fontSize: 15,
            color: 'gray',
             }}>
        {phoneNumber}
        </Text>
      </View>
          <TouchableOpacity onPress={handleConsult}>
        <View style={[styles.actionIcon, { backgroundColor: 'rgba(56, 186, 184, 0.57)'}]}>
          <Icon name="account-circle" size={20} color="white" />
        </View>
      </TouchableOpacity>
       <TouchableOpacity onPress={handleEdit}>
        <View style={[styles.actionIcon, { backgroundColor: '#ffbe61' }]}>
          <Icon name="edit" size={20} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.actionIcon} >
          <Icon name="delete" size={20} color="white" />
        </View>
      </TouchableOpacity>
            <EditClientModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        password={password}
        id={id}
      />
        <InfoClientModal
        visible={isConsulting}
        onClose={() =>setisConsulting(false)}
        onSave={handleSave}
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        password={password}
        id={id}
        AdminId={AdminId}
        joinDate={joinDate}
      
      />
    </View>
  );
};



class SearchClient extends Component {

                                        
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      adminData: [],
      sortedAdminData: [],
      filteredAdminData: [],
      modalVisible: false,
      AdminId :this.props.userData.user.specificId,
      error: null,
      location: null,
      searchValue: "",
      latitude:'',
      longitude:'',
      currentSortCriteria: null,

      
    };
    this.arrayholder = [];
    //console.log("Props",this.props.userData)
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
      this.UpdateAdminLocation(this.state.AdminId, location.coords.latitude, location.coords.longitude);
    } catch (error) {
      this.setState({ errorMsg: 'Error getting location' });
    }
  };


  /*********************Update location in dataBase**********************/

   UpdateAdminLocation = async (id,latitude,longitude) => {
  try {
  //  console.log("THIS IS THE LALTITUDE IN GETNEAREST",latitude)
  //   console.log("THIS IS THE LONGITUDE IN GETNEAREST",longitude)
  //   console.log("THIS IS THE id IN GETNEAREST",id)
    this.setState({latitude:latitude});
    this.setState({longitude:longitude});
       const response = await actions.Update_AdminLocation({ id,latitude,longitude});
  } catch (error) {
    console.error('Error getting nearest admins:', error);
  }
};


  /*************Function to render Clients in the page **************/
    async componentDidMount() {
    await this.fetchAdminData();
    this.getLocation(); 
    
      }
   async fetchAdminData() {

   const adminId=this.state.AdminId ; 
  try {
    const res = await actions.ShowAllClients(adminId);
    const { clients } = res;
    if (clients.length === 0) {
      this.setState({ adminData: [], sortedAdminData: [], error: null });
    } else {
      this.arrayholder = clients; 
      this.setState({ adminData: clients });
      if (this.state.sortedAdminData.length > 0) {
        const sortedAdminData = await actions.SortAdminByRating(); // Re-sort based on your sorting criteria
        this.setState({ sortedAdminData });
      }
    }
  } catch (error) {
    
    console.error('Error fetching admin data:', error);
    this.setState({ adminData: [], sortedAdminData: [], error });
  }
}
    async componentDidUpdate(prevProps, prevState) {

  if (prevState.adminData !== this.state.adminData) {
    await this.fetchAdminData();
  }
      }

  /*************Function to delete Client **************/
    async deleteClientItem(id) {
    try {

      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DeleteClient(id);
     //console.log(res);
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

  /******************Sort  Clients ***************************/

      handleCategorySelect = (selectedCategory) => {
       this.handleButtonPress(selectedCategory);
        }
     async handleButtonPress(selectedCategory){
    
    if (selectedCategory === 'This week Clients') {
      
  try {
      const sortedAdminData = await actions.ThisWeekClients(this.state.AdminId);
      this.setState({ sortedAdminData, currentSortCriteria: 'Date' }); 
       } catch (error) {}
    } else {
      await this.fetchAdminData();
      this.setState({ currentSortCriteria: null });
    }
    }

        /*******************Sort admin by alphabitic order *********************/

         async Alphabitic_Order_Sort() {

  try {
    const sortedAdminData = await actions.SortBy_AlphabetClient({});
    // console.log('Sorted Admin Data:', sortedAdminData);
    this.setState({ sortedAdminData: sortedAdminData, currentSortCriteria: 'Alpha' });
  } catch (error) {
    // Handle the error
    console.error('Error fetching admin data:', error);
   
  }
      }
  /*****************Search  Client function ********************/
    searchFunction = (text) => {
  const updatedData = this.arrayholder.filter((item) => {
    const item_data = `${item.user.name.toUpperCase()}`;
    const text_data = text.toUpperCase();
    return item_data.indexOf(text_data) > -1;
  });

  this.setState({ filteredAdminData: updatedData, searchValue: text });
    };
  /*****************Add Client function ********************/
    toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  handleModalClose = () => {
  this.setState({ modalVisible: false });
}
  /*****************Show Client info function ********************/

renderItem = ({ item }) => {

    const defaultProfilePic = require('../../../assets/cat2.jpg'); 
  return (
    <ListItem
      name={item.user.name}
      phoneNumber={item.user.phoneNumber}
      email={item.user.email}
      password={item.user.password}
      id={item.user.id}
      joinDate={item.user.createdAt}
      defaultProfilePic={defaultProfilePic}
      onDelete={() => this.deleteClientItem(item.id)}
      isActive={item.user.active}
      Activate={() => this.ActivateAdminItem(item.id)}
      DesActivate={() => this.DesActivateAdminItem(item.id)}
      AdminId={this.state.AdminId}
    />
  );
};


  render() {

      const { adminData, sortedAdminData, loading, currentSortCriteria,filteredAdminData} = this.state;
   
      let dataToRender;
      if (currentSortCriteria === 'Date') {
        const Sorted=sortedAdminData.clients;
      dataToRender = Sorted;
      }else if (this.state.currentSortCriteria === 'Alpha') {
        dataToRender = sortedAdminData;
      } else {
      dataToRender = this.state.searchValue ? filteredAdminData : adminData;
      }
     // console.log("this is the data lengthhhh !!!!!!!!!!!!!!!!!!!!!!!!!!!!:",dataToRender.length)
          return (
        <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <View>

          <View style={{ flexDirection: 'row'}} >
          <Text style={{fontSize: 60, color: COLORS.blue, fontWeight: 'bold'}}>
            VETIME
          </Text>
            <AntDesign name="bells" size={30} color={COLORS.blue}  style={styles.bell} />  

            </View>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Check all your clients here ! </Text>
        </View>

      </View>
        <TouchableOpacity onPress={() => this.updateLocation()} style={styles.btnStyle}>
          <Text style={styles.textStyle}>Update your location to be found easier</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={()=>{this.Alphabitic_Order_Sort()}}>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
        </TouchableOpacity>
      </View>
            {/*Sort Buttons*/}
 <CategoryList buttonData={buttonData} onCategorySelect={this.handleCategorySelect} />
           {/*Admin list*/}
           
           {dataToRender.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={dataToRender}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
            ) : (
                    <Image
                source={require('../../../assets/Empty.png')}
                resizeMode="contain"
                style={styles.imageStyle1}
            />    
            )}

        {/*Add Admin Button */}
          <View style={styles.footer}>
          <View style={styles.inputContainer}>
          </View>
          <TouchableOpacity onPress={this.toggleModal}>
            <View style={styles.iconContainer}>
              <AntDesign name="adduser" color="white" size={30} />
            </View>
          </TouchableOpacity>
          </View>
            <AddClientModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          onCloseModal={this.handleModalClose}
          supAdminId={this.state.AdminId}
        />
	  
        </SafeAreaView>
	      );
  }

}

export default SearchClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
    bell:{
        marginLeft: windowWidth*0.25,
    height: 50,
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
  searchInput: {
    fontSize: 18,
    color: 'black',
  },
  item: {
    padding: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 20,
    marginVertical: 10,
  },
      btnStyle: {
        width: 330,
        height: 50,
        borderRadius: 5,
        backgroundColor:COLORS.blue,
        opacity:1,
        marginTop:windowHeight*0.02,
        marginLeft : windowWidth*0.02,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
   footer: {
    position: 'absolute',
    bottom: 0,
    width: windowHeight*0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
 
  },
    iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(56, 186, 184, 0.57)',
    elevation: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
     marginRight: 20 
  },
    inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
  
  },
   searchIcon: {
    marginRight: 10,
  },
    listItem: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6962',
    marginLeft: 5,
    borderRadius: 3,
  },
 image: {
    width: 80,
    height: 70,
    borderRadius:52,
    resizeMode: 'cover', // Adjust this as needed
  },
  imageStyle1:{
        bottom: windowHeight * 0.01,
        right:windowWidth*0.35
  },
      textStyle: {
        fontSize: 13,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: COLORS.white,
    },
});







