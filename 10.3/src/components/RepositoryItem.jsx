import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  info: {
    flexDirection: 'column',
  },
  fullName: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    color: '#666',
  },
  language: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#0366d6',
    color: '#fff',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.info}>
          <Text style={styles.fullName}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{repository.stargazersCount}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{repository.forksCount}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{repository.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{repository.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
