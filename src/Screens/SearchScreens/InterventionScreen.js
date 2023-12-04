import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Dimensions, Image } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SortButton from "../../Components/SortButton";
import actions from "../../redux/actions";
import AddInterventionModal from '../AddModals/AddInterventionModal';
import EditAdminModal from "../EditModals/EditAdminModal";
import COLORS from "../../consts/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import InfoRecette from "./InfoRecette";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const Item = ({ lieu ,type}) => {
  return (
    <View style={styles.item}>
      <Text>{lieu}</Text>
      <Text>{type}</Text>
    </View>
  );
};

/******************Admin list design****************************/
const ListItem = ({ lieu,type, refAnimal,quantityOfAnimals, rapport,id, onDelete }) => {

 /***********Used to controle the color of button on activation and desactivation *************/
   const [isPressed, setIsPressed] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [isConsulting, setIsConsulting] = useState(false);
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
    setIsConsulting(true);
  };
    const handleSaveConsult = () => {
    // Perform the save action here
    setIsConsulting(false);
  };
  return (
   
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
     
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: 'black',
            // Add any textDecorationLine logic you need here
             }}>
          {lieu}
        </Text>
            <Text
          style={{
            fontWeight: 'light',
            fontSize: 15,
            color: 'gray',
             }}>
        {type}
        </Text>
       {refAnimal && (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontWeight: 'light',
                fontSize: 15,
                color: 'gray',
                right: 10,
                left: 2,
              }}
            >
              Animal ref:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                left: 5,
              }}
            >
              {refAnimal}
            </Text>
          </View>
        )}
      {quantityOfAnimals !== 0 && (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontWeight: 'light',
                fontSize: 15,
                color: 'gray',
                right: 10,
                left: 2,
              }}
            >
              Animal number:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                left: 5,
              }}
            >
              {quantityOfAnimals}
            </Text>
          </View>
        )}

         {rapport && (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontWeight: 'light',
                fontSize: 15,
                color: 'gray',
                right: 10,
                left: 2,
              }}
            >
              note:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                left: 5,
              }}
            >
              {rapport}
            </Text>
          </View>
        )}
      </View>

       <TouchableOpacity onPress={handleConsult}>
        <View style={[styles.actionIcon, { backgroundColor: COLORS.blue }]}>
          <AntDesign name="filetext1" size={20} color="white" />
        </View>
      </TouchableOpacity>
                <TouchableOpacity onPress={handleEdit}>
        <View style={[styles.actionIcon, { backgroundColor: '#ffbe61' }]}>
          <Icon name="edit" size={20} color={COLORS.white} />
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
        lieu={lieu}
        type={type}
        refAnimal={refAnimal}
        quantityOfAnimals={quantityOfAnimals}
        rapport={rapport}
        id={id}
      />
                  <InfoRecette
        visible={isConsulting}
        onClose={() => setIsConsulting(false)} 
        onSave={handleSaveConsult}
        id={id}
      />
    </View>
  );
};





class InterventionScreen  extends Component {

                                        
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      adminData: [],
      sortedAdminData: [],
     filteredAdminData: [],
     modalVisible: false,
     item: this.props.route.params,
     AdminId: this.props.route.params.item.AdminId,
      error: null,
      searchValue: "",
      currentSortCriteria: null,
      
    };
    this.arrayholder = [];
    console.log("Intervention screen item !!!!!!!!",this.state.item)
    console.log("Intervention screen item AdminId !!!!!!!!",this.state.AdminId)
   
  }


  /*************Function to render Admins in the page **************/
    async componentDidMount() {
    await this.fetchAdminData();
      }
async fetchAdminData() {
  const visitId = this.state.item.item.id;

  try {
    const res = await actions.ShowAllInterventions(visitId);
    const { allIntervention } = res; // Access the correct property name

    // Check if there are interventions to display
    if (allIntervention.length === 0) { // Use allIntervention instead of visits
      this.setState({ adminData: [], sortedAdminData: [], error: null });
    } else {
      this.arrayholder = allIntervention; // Update arrayholder
      this.setState({ adminData: allIntervention });

    }
  } catch (error) {
    // Handle the error
    console.error('Error fetching admin data:', error);
    this.setState({ adminData: [], sortedAdminData: [], error });
  }
}
    async componentDidUpdate(prevProps, prevState) {
    const { item: prevItem } = prevProps.route.params;
    const { item: currentItem } = this.props.route.params;

    if (currentItem !== prevItem) {
      this.setState({ item: currentItem });
    }
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

      // Update the color 
      
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
      console.log(this.arrayholder);
  const updatedData = this.arrayholder.filter((item) => {
    const item_data = `${item.lieu.toUpperCase()}`;
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
 //console.log("item.user:", item.user); // Log the item.user object
  
  return (
    <ListItem
      lieu={item.lieu}
      type={item.type}
      refAnimal={item.refAnimal}
      quantityOfAnimals={item.quantityOfAnimals}
      rapport={item.rapport}
      id={item.id}
      onDelete={() => this.deleteAdminItem(item.id)}
 
    />
  );
};

  render() {
    const {item} = this.state.item;
    console.log("this is the item inside the render ",this.state.item)
    console.log("this is the AdminId inside the render ",this.state.item.item.AdminId)
    if (!item) {
      // Handle the case when item is not available yet
      return null;
    }
      const { adminData, sortedAdminData, loading, currentSortCriteria,filteredAdminData} = this.state;
      let dataToRender;
      if (currentSortCriteria === 'Rating') {
  dataToRender = sortedAdminData;
      } else if (currentSortCriteria === 'clients') {
  console.log('Sorted by Clients:', sortedAdminData);
  dataToRender = sortedAdminData;
      } else {
  dataToRender = this.state.searchValue ? filteredAdminData : adminData;
      }
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
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Check the visit's interventions  </Text>
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

        {/*Add Intervention Button */}
          <View style={styles.footer}>
          <View style={styles.inputContainer}>
          </View>
          <TouchableOpacity onPress={this.toggleModal}>
            <View style={styles.iconContainer}>
              <Icon name="add" color="white" size={30} />
            </View>
          </TouchableOpacity>
          </View>
        {this.state.AdminId !== undefined && (
  <AddInterventionModal
    modalVisible={this.state.modalVisible}
    toggleModal={this.toggleModal}
    onCloseModal={this.handleModalClose}
    VisitId={this.state.item.item.id}
    AdminId={this.state.item.item.AdminId}
  />
)}
	      
        </SafeAreaView>
	      );
  }

}

export default InterventionScreen ;

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
        bell:{
        marginLeft: windowWidth*0.25,
    height: 50,
  },
  item: {
    padding: 20,
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
    backgroundColor: COLORS.white,
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
        top: windowHeight * 0.2,
        right:windowWidth*0.35
  },
});







