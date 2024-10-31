// RepositoryListContainer.js
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// RepositoryListHeader contains both search and sorting options
const RepositoryListHeader = ({ searchQuery, setSearchQuery, selectedOrder, onOrderChange }) => (
  <View style={styles.headerContainer}>
    <Searchbar
      placeholder="Search"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => onOrderChange(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

export const RepositoryListContainer = ({ repositories, searchQuery, setSearchQuery, selectedOrder, onOrderChange }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedOrder={selectedOrder}
          onOrderChange={onOrderChange}
        />
      }
    />
  );
};
