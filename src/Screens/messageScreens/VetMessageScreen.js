import { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Messagecomponent from '../../Components/MessageComponent'
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import COLORS from "../../consts/colors";
import { TouchableOpacity } from "react-native-gesture-handler";



const VetMessageScreen =({ route}) =>  {
  
  
  const socket = io.connect("http://192.168.1.136:3000");
    const currentUser = useSelector((state)=> state.auth.userData)
    console.log("user data §§§§§§§§§§§§§§§§§§§§",currentUser)
  const clientId= route.params.currentClientID;
  const senderId= currentUser.user.id;
  console.log("This is the route params !!!!!!!!!!!!!!!!!!",route.params)
  const [ allChatMessages, setAllChatMessages] = useState([
    {
      senderId:clientId,
      recieverId: senderId,
      message: "heyy",
      time: new Date(),
  },
  {
      senderId:senderId,
      recieverId: clientId,
      message: "Hiiiiiiiii",
      time: new Date(),
  }
  ]);
  const [ currentChatMessage, setCurrentChatMessage] = useState([]);


  socket.on('connect', () => {
      socket.emit('user_id', senderId);
    });

  function handleAddNewMessage() {
    

console.log("current: ",currentChatMessage)

    
      setAllChatMessages(
        [...allChatMessages, {
      senderId:senderId,
      recieverId: clientId,
      message: currentChatMessage,
      time: new Date(),
  }])
      socket.emit("newChatMessage", {
        message : currentChatMessage,
        recieverId: clientId,
        senderId,
        time: new Date(),
      });

      socket.emit("private_message", {to: clientId,message:{
        message: currentChatMessage,
        recieverId: clientId,
        senderId,
         time: new Date(),
      }});

      setCurrentChatMessage("");
      Keyboard.dismiss();
    }


   
useEffect(() => {
  socket.on('private_message', ({ message }) => {
    console.log("message : ", message);
    setAllChatMessages((prevMessages) => [...prevMessages, message]);
  });
  return () => {
    socket.off('private_message');
  };
}, []);

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
      >
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item, index }) => (
              <Messagecomponent key={index} item={item} currentUser={currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />

        <TouchableOpacity onPress={handleAddNewMessage} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>SEND</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default VetMessageScreen ;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "115%",
    top:12,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
  },
});