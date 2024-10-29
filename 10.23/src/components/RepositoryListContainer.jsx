// RepositoryListContainer.js
import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedOrder, onOrderChange }) => (
  <View style={styles.pickerContainer}>
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

export const RepositoryListContainer = ({ repositories, selectedOrder, onOrderChange }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader selectedOrder={selectedOrder} onOrderChange={onOrderChange} />
      }
    />
  );
};
