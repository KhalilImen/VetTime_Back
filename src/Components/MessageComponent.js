import { StyleSheet, Text, View } from "react-native";
import COLORS from "../consts/colors";

export default function Messagecomponent({ currentUser, item }) {
  const currentUserStatus = item.senderId !== currentUser.user.id;

  console.log(currentUserStatus , item);
  function dateFormatter(date){
    const now = date;

    // Get the hour component
    const hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const formattedHours = String(hours % 12 || 12).padStart(2, '0');

    return(`${formattedHours}:${String(now.getMinutes()).padStart(2, '0')} ${ampm}`);
  }
  return (
    <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
      <View style={styles.messageItemWrapper}>
        <View style={styles.messageItemInnerWrapper}>
          <View
            style={
              currentUserStatus
                ? styles.messageItem
                : [styles.messageItem, { backgroundColor: COLORS.blue}]
            }
          >
          
            <Text
              style={
                currentUserStatus ? { color: "#000" } : { color: "#FFFF" }
              }
            >
              {item.message}
            </Text>
          </View>
        </View>
        <Text style={styles.messageTime}> 
        {dateFormatter(item.time)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageItemWrapper: {
    maxWidth: "50%",
    marginBottom: 15,
  },
  messageItemInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 2,
  },
  messageTime : {
    marginLeft : 10
  }
});