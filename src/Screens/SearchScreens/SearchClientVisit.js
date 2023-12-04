import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Dimensions, Image } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SortButton from "../../Components/SortButton";
import { useRoute } from '@react-navigation/native';
import actions from "../../redux/actions";
import AddVisitModal from '../AddModals/AddVisitModal';
import InterventionScreen from '../SearchScreens/InterventionScreen'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../consts/colors";
import CategoryList from "../../Components/CategoryList";
import EditVisitModal from "../EditModals/EditVisitModal";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const buttonData = [{
	id: "1",
	title: "All",
},
{
	id: "2",
	title: "Weekly",
},
{
	id: "3",
	title: "Monthly",
},
{
	id: "4",
	title: "This year",
},
];


const Item = ({ name ,date,id,Done}) => {
  return (
    <View style={styles.item}>
      <Text>{name}</Text>
      <Text>{date}</Text>
      <Text>{id}</Text>
      <Text>{Done}</Text>
    </View>
  );
};

/******************Admin list design****************************/
const ListItem = ({ name,date,id, onDelete, Done , Activate, DesActivate  }) => {

 /***********Used to controle the color of button on activation and desactivation *************/
   const [isPressed, setIsPressed] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
    const StateColor = Done === 1 ? COLORS.green : COLORS.red;
   const State = Done === 1 ? 'Done' : 'Not Done yet';
  const handlePress = async () => {
    try {
      setIsPressed(true); 

      if (Done === 1) {
        await DesActivate(); 
      } else {
        await Activate(); 
      }
    } catch (error) {
      console.error('Error toggling admin activation:', error);
      setIsPressed(false); 
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
    const handleSave = () => {
    setIsEditing(false);
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
          {name}
        </Text>
            <Text
          style={{
            fontWeight: 'light',
            fontSize: 15,
            color: 'gray',
             }}>
        {date}
        </Text>
                <Text style={{fontSize: 15, fontWeight: 'bold' , color:StateColor}}>
              {State}
            </Text>
      </View>
       <TouchableOpacity onPress={handleEdit}>
        <View style={[styles.actionIcon, { backgroundColor: '#ffbe61' }]}>
          <Icon name="edit" size={20} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.actionIcon,{ backgroundColor:(Done !== 1 ? '#4dd24d' : 'gray') }]}>
          <Icon name="done" size={20} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.actionIcon} >
          <Icon name="delete" size={20} color="white" />
        </View>
      </TouchableOpacity>
            <EditVisitModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        name={name}
        date={date}
        id={id}
      />
      
    </View>
  );
};


class SearchClientVisit extends Component {
             
  constructor(props) {
    super(props);
    this.state = {
    loading: false,
    visitData: [],
    sortedVisitData: [],
    filteredvisitData: [],
    modalVisible: false,
    error: null,
    AdminId: this.props.route.params.AdminId,
    ClientId: this.props.route.params.id,
    ClientName: this.props.route.params.name,
    searchValue: "",
    currentSortCriteria: null,
  
    };
    this.arrayholder = [];
  }

navigateToAnotherScreen = (item)=> {
  console.log("THE ITEM CONTENT IS !!!!!!!!",item)

  this.props.navigation.navigate('InterventionScreen', { item });
}

  /*************Function to render Admins in the page **************/
    async componentDidMount() {
    await this.fetchvisitData();     
      }

 async fetchvisitData() {
    const AdminId = this.state.AdminId;
    const ClientId = this.state.ClientId;
  try {

    const res = await actions.showClientVisits({ AdminId, ClientId });
    const visits = res.allVisits;
    if (visits.length === 0) {
      this.setState({visitData: [], sortedVisitData: [], error: null });
    } else  {
      this.arrayholder = visits; 
      this.setState({ visitData: visits });
    
    }
    
  } catch (error) {
   
    console.error('Error fetching admin data:', error);
    this.setState({ visitData: [], sortedVisitData: [], error });
  }
}
async componentDidUpdate(prevProps,prevState) {
  if ( prevState.visitData !== this.state.visitData ) {
    // Perform the necessary action or update
    await this.fetchvisitData();
  }
}
  /*************Function to delete Admin **************/
    async deleteAdminItem(id) {
    try {
      console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.DeleteVisit(id);
     console.log(res);
      // Update the displayed list and arrayholder
      const updatedvisitData = this.state.visitData.filter(item => item.id !== id);
      this.setState({ visitData: updatedvisitData });
      this.arrayholder = updatedvisitData;
    } catch (error) {
      console.error('Error removing admin item:', error);
    }
      }
/**********************Activate Admin********************************/
    async ActivateAdminItem(id) {
    try {
      console.log(id)
      // Perform the action to remove the admin item from the database using the id
     const res = await actions.VisitUndone(id); 
    } catch (error) {
      console.error('Error activating admin item:', error);
    }
    }
/**********************desActivate Admin********************************/
  async DesActivateAdminItem(id) {
    try {
      console.log(id)
     
     const res = await actions.VisitDone(id);
    } catch (error) {
      console.error('Error desactivating admin item:', error);
    }
    }
  /******************Sort Admins ***************************/
        handleCategorySelect = (selectedCategory) => {
       this.handleButtonPress(selectedCategory);
        }
async handleButtonPress(selectedCategory) {
  const adminId = this.state.AdminId;
  const clientId = this.state.ClientId;
  const AdminId = this.state.AdminId;
  const ClientId = this.state.ClientId;

  if (selectedCategory === 'Weekly') {
    const response = await actions.showClientVisits_Thisweek({clientId,adminId});
    const allVisits = response.allVisits ;
    console.log("THIS IS ALLLL VISITS§§§§§§§§:",allVisits)
    console.log("THIS IS ALLLL VISITS§§§§§§§§:",response)
    this.setState({ sortedVisitData: allVisits, currentSortCriteria: 'Weekly' }); 
  }  else if (selectedCategory === 'Monthly') {
    const response = await actions.showClientVisits_ThisMonth({ clientId, adminId });
    const allVisits = response.allVisits ;
    this.setState({ sortedVisitData: allVisits, currentSortCriteria: 'Monthly' }); 
  }  else if (selectedCategory === 'This year') {
    const response = await actions.showClientVisits_ThisYear({ clientId, adminId });
    const allVisits = response.allVisits;
    this.setState({ sortedVisitData: allVisits, currentSortCriteria: 'This year' }); 
  }  
   else {
    await this.fetchvisitData();
     this.setState({  currentSortCriteria: null });
  }
}

  /*****************Search Admin function ********************/
    searchFunction = (text) => {
      console.log("THIS IS THE SEARCH VALUE ",this.arrayholder);
  const updatedData = this.arrayholder.filter((item) => {
    const item_data = `${item.name.toUpperCase()}`;
    const text_data = text.toUpperCase();
    return item_data.indexOf(text_data) > -1;
  });
  this.setState({ filteredvisitData: updatedData, searchValue: text });
    };
  /*****************Add Admin function ********************/
    toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  handleModalClose = () => {
  this.setState({ modalVisible: false });
}
/********************Change the date format ********************* */
formatDate = (dateString) => {
  // Assuming dateString is in the format "2023-08-24T17:42:01.000Z"
  const dateParts = dateString.split("T");
  return dateParts[0]; // This will return "2023-08-24"
};
renderItem = ({ item }) => {
 // Get the navigation object
 console.log("This is the item ",item)

  return (
    <TouchableOpacity onPress={() => this.navigateToAnotherScreen(item)} >
    <ListItem
      name={item.name}
      date={this.formatDate(item.date)}
      id={item.id}
      Done={item.Done}
      onDelete={() => this.deleteAdminItem(item.id)}
      Activate={() => this.ActivateAdminItem(item.id)}
      DesActivate={() => this.DesActivateAdminItem(item.id)}
    />
    </TouchableOpacity>
  );
};

  render() {
    

      const { visitData, sortedVisitData, loading, currentSortCriteria,filteredvisitData} = this.state;

      let dataToRender;
      if (currentSortCriteria === 'Weekly') {
      dataToRender = sortedVisitData;
      console.log("THIS IS THE WEEKLY DATA", dataToRender)
      }  else if (currentSortCriteria === 'Monthly') {
      dataToRender = sortedVisitData;
          console.log("THIS IS THE MONTHLY DATA", dataToRender)
      }   else if (currentSortCriteria === 'This year') {
      dataToRender = sortedVisitData;
          console.log("THIS IS THE YEARLY DATA", dataToRender)
      }else {dataToRender = this.state.searchValue ? filteredvisitData : visitData;}
      console.log("THIS IS THE DATA", dataToRender)
      
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
            <View style={{ flexDirection: 'row'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Check your visits to </Text>
          <Text style={{fontSize: 27, fontWeight: 'light', color: COLORS.blue}}>{this.state.ClientName} </Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}> !</Text>
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

        {/*Add Visit Button */}
          <View style={styles.footer}>
          <View style={styles.inputContainer}>
          </View>
          <TouchableOpacity onPress={this.toggleModal}>
            <View style={styles.iconContainer}>
              <AntDesign name="form" color="white" size={30} />
            </View>
          </TouchableOpacity>
          </View>
          <AddVisitModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          onCloseModal={this.handleModalClose}
          AdminId={this.state.AdminId}
          ClientId={this.state.ClientId}
          />
	  
        </SafeAreaView>
	      );
  }

}

export default SearchClientVisit;

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







