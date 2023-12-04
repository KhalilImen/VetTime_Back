  import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../consts/colors';
 const CategoryList = ({ buttonData ,onCategorySelect }) => {
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  return (
    <View style={style.categoryContainer}>
      {buttonData.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
             onPress={() => {
            setCategoryIndex(index);
            onCategorySelect(item.title); // Pass the selected category title to the callback
          }}>
          <Text
            style={[
              style.categoryText,
              categoryIndex === index && style.categoryTextSelected,
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default CategoryList;
const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  imageStyle:{
     marginTop: 10,
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.blue,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.blue,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },

  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },

});