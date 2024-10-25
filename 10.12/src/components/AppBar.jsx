import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'; // Import the AppBarTab component

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: '#24292e', // Dark background for the AppBar
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center', // Center the tabs vertically
  },
  tab: {
    paddingHorizontal: 20, // Add horizontal padding for spacing between tabs
    paddingVertical: 10,   // Reasonable vertical padding to make the tabs look nice
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView} showsHorizontalScrollIndicator={true}>
        <AppBarTab title="Repositories" to="/" style={styles.tab} />
        <AppBarTab title="Sign In" to="/signin" style={styles.tab} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
