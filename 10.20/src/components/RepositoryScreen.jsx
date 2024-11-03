import React from 'react';
import { View, Button, Linking, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { format } from 'date-fns'; // Import format from date-fns
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    width: 200,
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
    borderRadius: 20, // Makes it a circle
    backgroundColor: '#ffffff', // White background
    borderWidth: 2, // Blue border around the circle
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#007bff', // Blue text color
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


const RepositoryScreen = () => {
  const { repositoryId } = useParams();

  const { data: repoData, loading: repoLoading, error: repoError } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  });

  const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(GET_REVIEWS, {
    variables: { repositoryId },
  });

  if (repoLoading || reviewsLoading) return <Text>Loading...</Text>;
  if (repoError) return <Text>Error loading repository: {repoError.message}</Text>;
  if (reviewsError) return <Text>Error loading reviews: {reviewsError.message}</Text>;

  const repository = repoData.repository;
  const reviews = reviewsData.repository.reviews.edges.map(edge => edge.node);

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      {/* Rounded rating indicator with blue text and white background */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        {/* Username and Date */}
        <Text style={styles.username}>{item.user.username}</Text>
        <Text style={styles.date}>
          {format(new Date(item.createdAt), 'dd.MM.yyyy')}
        </Text>
        {/* Review Text */}
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Repository Information */}
      <RepositoryItem repository={repository} isClickable={false} />
      <View style={styles.buttonContainer}>
        <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Reviews:</Text>}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );

};

export default RepositoryScreen;
