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
import AddRecetteModal from "../AddModals/AddRecetteModal";
import EditRecetteModal from "../EditModals/EditRecetteModal";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const buttonData = [
  {
	id: "1",
	title: "All",
},
{
	id: "2",
	title: "Today",
},
{
	id: "3",
	title: "Weekly",
},
{
	id: "4",
	title: "Monthly",
},
{
	id: "5",
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
const ListItem = ({ lieu,type, refAnimal,quantityOfAnimals, rapport,id, onDelete,date }) => {

 /***********Used to controle the color of button on activation and desactivation *************/
   const [isPressed, setIsPressed] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [isAdding, setIsAdding] = useState(false);





  const handleRecette = async () => {
  try {
    const interId = id;
    console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§',interId)
    const response = await actions.Recette_Exist(interId);
 console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§',response.visit)
    if  ('visit' in response) {
       setIsEditing(true);

    } 
    else {
      setIsAdding(true);
    }
  } catch (error) {
    console.error('Error checking intervention:', error);
  }
};

  const handleEdit = () => {
    setIsEditing(true);
  };
    const handleSave = () => {
    setIsEditing(false);
  };

    const handleAdd = () => {
    setIsAdding(true);
  };

    const handleSaveAdd = () => {
    setIsAdding(false);
  };
  return (
   
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
      <Text
          style={{
            fontWeight: 'light',
            fontSize: 15,
            color: 'gray',
             }}>
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
              place:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                left: 5,
              }}
            >
              {lieu}
            </Text>
          </View>
        </Text>
            <Text
          style={{
            fontWeight: 'light',
            fontSize: 15,
            color: 'gray',
             }}>
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
              date:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                left: 5,
              }}
            >
              {date}
            </Text>
          </View>
        </Text>

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
              type:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                left: 5,
              }}
            >
              {type}
            </Text>
          </View>
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

       <TouchableOpacity onPress={handleRecette}>
        <View style={[styles.actionIcon, { backgroundColor: COLORS.blue }]}>
          <AntDesign name="addfile" size={20} color="white" />
        </View>
      </TouchableOpacity>
        <AddRecetteModal
        visible={isAdding}
        onClose={() => setIsAdding(false)}
        onSave={handleSaveAdd}
        id={id}
      />

<EditRecetteModal
  visible={isEditing}
  onClose={() => setIsEditing(false)}
  onSave={handleSave}
  id={id}
  
/>

    </View>
  );
};

  // const handlePress = async () => {
  //   try {
  //     setIsPressed(true); // Set the button as pressed immediately.

  //     if (isActive === 1) {
  //       await DesActivate(); // Deactivate the user.
  //     } else {
  //       await Activate(); // Activate the user.
  //     }
  //   } catch (error) {
  //     console.error('Error toggling admin activation:', error);
  //     setIsPressed(false); // Reset the button state on error.
  //   }
  // };



class SearchAgentInter extends Component {
             
  constructor(props) {
    super(props);
    this.state = {
    loading: false,
    visitData: [],
    sortedVisitData: [],
    filteredvisitData: [],
    modalVisible: false,
    error: null,
    AdminId: this.props.userData.user.specificId,
    ClientId:this.props.userData.user.specificId,
    ClientName: this.props.userData.user.specificId,
    searchValue: "",
    currentSortCriteria: null,
  
    };
    this.arrayholder = [];
  }



  /*************Function to render Admins in the page **************/
    async componentDidMount() {
    await this.fetchvisitData();     
      }

 async fetchvisitData() {
    const agentId = this.state.AdminId;
    const ClientId = this.state.ClientId;

  try {

    const res = await actions.ShowAgentInterventions(agentId);
    const visits = res.allIntervention;
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
  const agentId = this.state.AdminId;
  console.log("THIS IS THE AGENTid in handlePRESS §§§§§§§§§§§§§§§§§§§§§§§§§",agentId)
  if (selectedCategory === 'Weekly') {
    const response = await actions.ShowAgentInterventions_thisWeek(agentId);
    const allVisits = response.allIntervention ;
    this.setState({ sortedVisitData: allVisits, currentSortCriteria: 'Weekly' }); 
  }  else if (selectedCategory === 'Monthly') {
    const response = await actions.ShowAgentInterventions_thisMonth(agentId);
    const allVisits = response.allIntervention ;
    this.setState({ sortedVisitData: allVisits, currentSortCriteria: 'Monthly' }); 
  } else if (selectedCategory === 'Today') {
    const response = await actions.ShowAgentInterventions_today(agentId);
    console.log("TODAY RESPONSE §§§§§§§§§§§§!!!!!!!!!!!!!!!!!!!!!!!!!!",response)
    const allVisits = response.allIntervention ;
    
    console.log("THIS IS TODAYYYY RESULT ",allVisits)
    this.setState({ sortedVisitData: allVisits, currentSortCriteria: 'Today' }); 
  } else if (selectedCategory === 'This year') {
    const response = await actions.ShowAgentInterventions_thisYear(agentId);
    const allVisits = response.allIntervention;
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
    const item_data = `${item.lieu.toUpperCase()}`;
    const text_data = text.toUpperCase();
    return item_data.indexOf(text_data) > -1;
  });
  this.setState({ filteredvisitData: updatedData, searchValue: text });
    };



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
   
    <ListItem
      lieu={item.lieu}
      type={item.type}
      refAnimal={item.refAnimal}
      quantityOfAnimals={item.quantityOfAnimals}
      rapport={item.rapport}
      date={this.formatDate(item.visitDate)}
      id={item.id}
      onDelete={() => this.deleteAdminItem(item.id)}
 
    />
   
  );
};

  render() {
      const { visitData, sortedVisitData, loading, currentSortCriteria,filteredvisitData} = this.state;

      let dataToRender;
      if (currentSortCriteria === 'Weekly') {
      dataToRender = sortedVisitData;
      console.log("THIS IS THE WEEKLY DATA", dataToRender)
      }  else if (currentSortCriteria === 'Today') {
      dataToRender = sortedVisitData;
          console.log("THIS IS THE MONTHLY DATA", dataToRender)
      }   else if (currentSortCriteria === 'Monthly') {
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
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.gray}}>Check your interventions planning !</Text>
          </View>
        </View>

      </View>

      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput      
            style={styles.searchInput}
            placeholder="Search intervention by place ..."
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
        </SafeAreaView>
	      );
  }

}

export default SearchAgentInter;

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







