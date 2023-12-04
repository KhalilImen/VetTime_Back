  import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import COLORS from '../consts/colors';


const DropDown = ({ types, selectedValue, onSelect ,isAgentDropdown }) => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color={COLORS.blue}
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={types}
      search
      maxHeight={150}
      labelField="label"
      valueField="value"
      placeholder={isAgentDropdown ? "Select agent" : "Select intervention type"}
      searchPlaceholder="Search..."
      value={isAgentDropdown ? selectedValue : value}
      onChange={item => {
        setValue(item.value);
        if (isAgentDropdown) {
          onSelect(item.value); // Pass the value for agents
        } else {
          onSelect(item.label); // Pass the label for types
        }
      }}
      renderLeftIcon={() => (
        <AntDesign
          style={styles.icon}
          color={COLORS.blue}
          name="Safety"
          size={20}
        />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropDown;


  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },

    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      color:COLORS.gray
    },
    placeholderStyle: {
      fontSize: 16,

    },
    selectedTextStyle: {
      fontSize: 16,
      color:COLORS.gray
    },
    iconStyle: {
      width: 20,
      height: 20,
      color:COLORS.blue
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });