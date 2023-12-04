import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Dimensions, Image } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SortButton from "../../Components/SortButton";
import actions from "../../redux/actions";
import AddAdminModal from '../AddModals/AddAdminModal';
import EditAdminModal from "../EditModals/EditAdminModal";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import COLORS from "../../consts/colors";
import CategoryList from "../../Components/CategoryList";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const buttonData = [{
	id: "1",
	title: "All",
},
{
	id: "2",
	title: "sort by Rating",
},
{
	id: "3",
	title: "sort by clients",
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
const ListItem = ({ name,phoneNumber, Pic,email,password,id, onDelete,defaultProfilePic,isActive, Activate, DesActivate,active }) => {
    console.log("this is the email ",email)
    console.log ("This is the specific ID ",id)
    const profilePic = Pic ? { uri: Pic } : defaultProfilePic;
 /***********Used to controle the color of button on activation and desactivation *************/
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
   
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
      <Image  source={profilePic} style={styles.image} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: 'black',
            // Add any textDecorationLine logic you need here
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
                <Text style={{fontSize: 15, fontWeight: 'bold' , color:AvailabilityColor}}>
              {Availability}
            </Text>
      </View>
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
            <EditAdminModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        password={password}
        id={id}
      />
    </View>
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
     supAdminId:this.props.userData.user.specificId,
      error: null,
      searchValue: "",
      currentSortCriteria: null,
      
    };
    this.arrayholder = [];
    console.log("Props",this.props.userData)
  }


  /*************Function to render Admins in the page **************/
    async componentDidMount() {
    await this.fetchAdminData();
    
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
      console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DeleteAdmin(id);
     console.log(res);
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
      console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.ActivateAdmin(id);
     console.log(res);

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
      console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DesActivateAdmin(id);
     console.log(res);
         if (this.state.sortedAdminData.length > 0) {
      const sortedAdminData = await actions.SortAdminByRating(); // Re-sort based on your sorting criteria
      this.setState({ sortedAdminData });
    }

      // Update the color 
      
    } catch (error) {
      console.error('Error desactivating admin item:', error);
    }
    }
    /*******************Sort admin by alphabitic order *********************/

     async Alphabitic_Order_Sort() {

  try {
    const sortedAdminData = await actions.SortBy_AlphabetClient({});
    console.log('Sorted Admin Data:', sortedAdminData);
    this.setState({ sortedAdminData: sortedAdminData, currentSortCriteria: 'Alpha' });
  } catch (error) {
    // Handle the error
    console.error('Error fetching admin data:', error);
   
  }
      }

  /******************Sort Admins ***************************/

    handleCategorySelect = (selectedCategory) => {
  // Do something with the selected category, for example, pass it to handleButtonPress
  this.handleButtonPress(selectedCategory);
}
     async handleButtonPress(selectedCategory){
    
    if (selectedCategory === 'sort by Rating') {
      const sortedAdminData = await actions.SortAdminByRating();
      this.setState({ sortedAdminData, currentSortCriteria: 'Rating' }); // Store the sorted data in the state
    }else if (selectedCategory === 'sort by clients') {
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
      console.log(this.arrayholder);
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

renderItem = ({ item }) => {

    const defaultProfilePic = require('../../../assets/cat2.jpg'); 
 
  return (
    <ListItem
      name={item.user.name}
      phoneNumber={item.user.phoneNumber}
      Pic={item.user.Pic}
      email={item.user.email}
      password={item.user.password}
      id={item.user.id}
      active={item.user.active}
      defaultProfilePic={defaultProfilePic}
      onDelete={() => this.deleteAdminItem(item.id)}
      isActive={item.user.active}
      Activate={() => this.ActivateAdminItem(item.id)}
      DesActivate={() => this.DesActivateAdminItem(item.id)}
    />
  );
};

  render() {

     const { adminData, sortedAdminData, loading, currentSortCriteria, filteredAdminData } = this.state;
let dataToRender = this.state.searchValue ? filteredAdminData : adminData;
if (this.state.currentSortCriteria === 'Rating') {
  dataToRender = sortedAdminData;
} else if (this.state.currentSortCriteria === 'clients') {
  dataToRender = sortedAdminData;
} else if (this.state.currentSortCriteria === 'Alpha') {
  dataToRender = sortedAdminData;
}



console.log('Current CRITERIA IS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!', currentSortCriteria);

      
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
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Check the vets we have ! </Text>
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
            <AddAdminModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          onCloseModal={() => this.setState({ modalVisible: false })}
          supAdminId={this.state.supAdminId}
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
    imageStyle:{
     marginTop:-60,
     marginLeft:windowWidth*0.1,
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
    width: 60,
    height: 50,
    resizeMode: 'cover', // Adjust this as needed
  },
  imageStyle1:{
        bottom: windowHeight * 0.01,
        right:windowWidth*0.35
  },

  
});







