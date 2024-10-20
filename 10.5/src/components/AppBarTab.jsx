import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
  },
  tabText: {
    color: '#ffffff', // White text
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const AppBarTab = ({ title, onPress }) => {
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <Text style={styles.tabText}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
