// components/UserReviews.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { reviews, loading, error } = useUserReviews(true);

  if (loading) return <Text>Loading reviews...</Text>;
  if (error) return <Text>Error loading reviews</Text>;

  // Render each review item, passing showButtons as true to show the buttons
  const renderReviewItem = ({ item }) => (
    <ReviewItem review={item} showUsername={false} showRepositoryName={true} showButtons={true} /> // Pass showButtons prop
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Your Reviews:</Text>
      <FlatList
        data={reviews} // Use reviews directly
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default UserReviews;
