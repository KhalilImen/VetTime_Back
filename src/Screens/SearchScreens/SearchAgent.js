import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Dimensions, Image } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import actions from "../../redux/actions";
import AddAgentModal from '../AddModals/AddAgentModal';
import EditAgentModal from "../EditModals/EditAgentModal";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../consts/colors";
import InfoAgentModal from "./InfoAgentModal";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Item = ({ name ,phoneNumber}) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
      <Text>{phoneNumber}</Text>
    </View>
  );
};

/******************Admin list design****************************/
const ListItem = ({ name,phoneNumber, Pic,email,password,id, onDelete, isActive, Activate, DesActivate,defaultProfilePic,AdminId,joinDate }) => {
 const profilePic = Pic ? { uri: Pic } : defaultProfilePic;
 /***********Used to controle the color of button on activation and desactivation *************/

   const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };
   const [isPressed, setIsPressed] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [isConsulting, setisConsulting] = useState(false);
  //   const AvailabilityColor = active === 1 ? COLORS.green : COLORS.red;
  //  const Availability = active === 1 ? 'Available' : 'Not Available';
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
      const handleConsult = () => {
    setisConsulting(true);
  };

  return (
      <TouchableOpacity onPress={handleConsult}>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity  onPress={openModal}>
            <View
              style={{
                height: 25,
                width: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                   <AntDesign
          name="aliwangwang"
          size={25}
          color={COLORS.blue} 
         
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

          </View>
        {/* <Text style={{fontSize: 15, fontWeight: 'bold' , color:AvailabilityColor}}>
              {Availability}
            </Text> */}
              <View style={{flexDirection:'row' ,top:6, left:-5}}>
       <TouchableOpacity onPress={handleEdit}>
        <View style={[styles.actionIcon, { backgroundColor: '#ffbe61' }]}>
          <Icon name="edit" size={20} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.actionIcon,{ backgroundColor:(isActive === 1 ? '#4dd24d' : 'gray') }]}>
          <Icon name="done" size={20} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.actionIcon} >
          <Icon name="delete" size={20} color="white" />
        </View>
      </TouchableOpacity>
      </View>
        </View>

            <EditAgentModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        password={password}
        id={id}
      />
              <InfoAgentModal
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
         
                  {/* <MessageModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                id={id}
                /> */}
      </TouchableOpacity>
      
    );

};





class Search extends Component {

                                        
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      adminData: [],
      sortedAdminData: [],
     filteredAdminData: [],
     modalVisible: false,
     AdminId :this.props.route.params.AdminId,
      error: null,
      searchValue: "",
      currentSortCriteria: null,
      
    };
    this.arrayholder = [];
    //console.log("Props",this.props.userData)
    console.log("Route Params:§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§", this.props.route);
    console.log("this is routes !!!!!!!!!!!!!!!!",this.state.AdminId)
  }


  /*************Function to render Agents in the page **************/
    async componentDidMount() {
    await this.fetchAdminData();
    
      }
    async fetchAdminData() {

const adminId=this.state.AdminId ;
  try {
    const admins = await actions.ShowAllAgents(adminId);
    // Check if there are admins to display
    if (admins.Agent.length === 0) {
      this.setState({ adminData: [], sortedAdminData: [], error: null });
    } else {
      this.arrayholder = admins.Agent; // Update arrayholder
      this.setState({ adminData: admins.Agent });

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

  /*************Function to delete Agent **************/
    async deleteAdminItem(id) {
    try {
      //console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DeleteAgent(id);
     //console.log(res);
      // Update the displayed list and arrayholder
      const updatedAdminData = this.state.adminData.filter(item => item.id !== id);
      this.setState({ adminData: updatedAdminData });
      this.arrayholder = updatedAdminData;

    } catch (error) {
      console.error('Error removing admin item:', error);
    }
      }
/**********************Activate Agent********************************/
    async ActivateAdminItem(id) {
    try {
      //console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.ActivateAgent(id);
     //console.log(res);
    } catch (error) {
      console.error('Error activating admin item:', error);
    }
    }
/**********************desActivate Agent********************************/
  async DesActivateAdminItem(id) {
    try {
      //console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DesActivateAgent(id);
    } catch (error) {
      console.error('Error desactivating admin item:', error);
    }
    }


  /******************Sort Admins ***************************/
     async handleButtonPress(title){
    
    if (title === 'sort by Rating') {
      const sortedAdminData = await actions.SortAdminByRating();
      this.setState({ sortedAdminData, currentSortCriteria: 'Rating' }); // Store the sorted data in the state
    }else if (title === 'sort by clients') {
 if (this.state.currentSortCriteria !== 'clients') {
      // If not, sort the data by clients
      const sortedAdminData = await actions.SortAdminByNbClient();
      this.setState({ sortedAdminData, currentSortCriteria: 'clients' });
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



renderItem = ({ item }) => {
 // console.log("item.user:", item.user); // Log the item.user object
 const defaultProfilePic = require('../../../assets/cat2.jpg'); 
  
  return (
    <ListItem
      name={item.user.name}
      phoneNumber={item.user.phoneNumber}
      Pic={item.user.Pic}
      email={item.user.email}
      password={item.user.password}
      id={item.user.id}
      joinDate={item.user.createdAt}
      onDelete={() => this.deleteAdminItem(item.id)}
      isActive={item.user.active}
      defaultProfilePic={defaultProfilePic}
      Activate={() => this.ActivateAdminItem(item.id)}
      DesActivate={() => this.DesActivateAdminItem(item.id)}
      AdminId={this.state.AdminId}
    />
  );
};

  render() {

      const { adminData, sortedAdminData, loading, currentSortCriteria,filteredAdminData} = this.state;
      let dataToRender;
      if (currentSortCriteria === 'Rating') {
  dataToRender = sortedAdminData;
      } else if (currentSortCriteria === 'clients') {
  //console.log('Sorted by Clients:', sortedAdminData);
  dataToRender = sortedAdminData;
      } else {
  dataToRender = this.state.searchValue ? filteredAdminData : adminData;
      }
      
      //console.log("this is the data to render ",dataToRender)
      //console.log("this is sorted data ",sortedAdminData)
      //console.log("this is filtred data  ",filteredAdminData)
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
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Check your agents here ! </Text>
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
        <TouchableOpacity onPress={()=>{this.Alphabitic_Order_Sort()}}>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
        </TouchableOpacity>
      </View>

           {/*Admin list*/}
           
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
          
            <AddAgentModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          onCloseModal={this.handleModalClose}
          supAdminId={this.state.AdminId}
          
        />
	      </SafeAreaView>
	      );
  }

}

export default Search;

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
      bell:{
        marginLeft: windowWidth*0.25,
    height: 50,
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
  card: {
    height: 235,
    backgroundColor: COLORS.light,
    marginHorizontal: 4,
    borderRadius: 10,
    width:162,
    marginBottom: 20,
    padding: 15,
    
  },
 image: {
    width: 60,
    height: 50,
    resizeMode: 'cover', // Adjust this as needed
  },
  imageStyle1:{
        bottom: windowHeight * 0.01,
        right:windowWidth*0.35
  },
});







