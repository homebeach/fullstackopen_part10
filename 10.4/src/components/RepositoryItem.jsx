import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  language: {
    marginBottom: 5,
  },
  stats: {
    marginTop: 10,
  },
  statItem: {
    marginBottom: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>Full name: {repository.fullName}</Text>
      <Text style={styles.description}>Description: {repository.description}</Text>
      <Text style={styles.language}>Language: {repository.language}</Text>
      
      <View style={styles.stats}>
        <Text style={styles.statItem}>Stars: {repository.stargazersCount}</Text>
        <Text style={styles.statItem}>Forks: {repository.forksCount}</Text>
        <Text style={styles.statItem}>Reviews: {repository.reviewCount}</Text>
        <Text style={styles.statItem}>Rating: {repository.ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
