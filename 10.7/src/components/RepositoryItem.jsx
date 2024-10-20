import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: '#586069',
    marginBottom: 10,
  },
  language: {
    color: '#fff',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#586069',
  },
});

// Utility function to format numbers
const formatThousands = (num) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      {/* Avatar Image */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      </View>

      {/* Repository Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{repository.fullName}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        <Text style={styles.language}>{repository.language}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{formatThousands(repository.stargazersCount)}</Text>
            <Text style={styles.statLabel}>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{formatThousands(repository.forksCount)}</Text>
            <Text style={styles.statLabel}>Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{repository.reviewCount}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{repository.ratingAverage}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
