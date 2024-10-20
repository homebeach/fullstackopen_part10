import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'; // Import the AppBarTab component

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: '#24292e', // Dark background for the AppBar
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-around', // Space between the tabs
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Repositories" onPress={() => {}} /> 
      {/* You can easily add more tabs here in the future */}
    </View>
  );
};

export default AppBar;