// components/UserReviews.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1
  },
  separator: {
    height: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  reviewText: {
    color: '#333',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { reviews, loading, error } = useUserReviews(true);

  if (loading) return <Text>Loading reviews...</Text>;
  if (error) return <Text>Error loading reviews</Text>;

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{item.repository?.name || 'You'}</Text>
        <Text style={styles.date}>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Your Reviews:</Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default UserReviews;
