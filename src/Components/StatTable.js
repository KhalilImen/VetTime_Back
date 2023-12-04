import React from 'react';
import { View, StyleSheet } from 'react-native';

const StatTable = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={styles.cell}>
          {/* Header Cell Content */}
        </View>
          <View style={styles.cell}>
          {/* Header Cell Content */}
        </View>
          <View style={styles.cell}>
          {/* Header Cell Content */}
        </View>
        <View style={styles.cell}>
          {/* Header Cell Content */}
        </View>
        {/* Add more header cells as needed */}
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          {/* Row 1, Cell 1 Content */}
        </View>
        <View style={styles.cell}>
          {/* Row 1, Cell 1 Content */}
        </View>
        <View style={styles.cell}>
          {/* Row 1, Cell 1 Content */}
        </View>
        <View style={styles.cell}>
          {/* Row 1, Cell 2 Content */}
        </View>
        {/* Add more cells for row 1 as needed */}
      </View>

      {/* Add more rows as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: 'rgba(56, 186, 184, 0.57)',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default StatTable;
