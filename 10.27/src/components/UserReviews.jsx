// components/UserReviews.js
import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  separator: {
    height: 10,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { reviews, loading, error, refetch, fetchMore } = useUserReviews(true);

  if (loading && reviews.length === 0) return <Text>Loading reviews...</Text>;
  if (error) return <Text>Error loading reviews</Text>;

  const handleReviewDeleted = () => {
    refetch();
  };

  const renderReviewItem = ({ item }) => (
    <ReviewItem
      review={item}
      showUsername={false}
      showRepositoryName={true}
      showButtons={true}
      onReviewDeleted={handleReviewDeleted}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Your Reviews:</Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator style={styles.loadingIndicator} /> : null
        }
        onEndReached={fetchMore} // Trigger fetchMore when end is reached
        onEndReachedThreshold={0.5} // Adjust threshold as needed
      />
    </View>
  );
};

export default UserReviews;
