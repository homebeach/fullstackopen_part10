// RepositoryListHeader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchbarContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
});

const RepositoryListHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchbarContainer}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default RepositoryListHeader;
