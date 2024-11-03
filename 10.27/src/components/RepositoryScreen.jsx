// components/RepositoryScreen.js
import React from 'react';
import { View, Button, Linking, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ReviewItem from './ReviewItem';

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
    <ReviewItem review={item} showDeleteButton={false} showButtons={false} /> // Hide buttons in RepositoryScreen
  );

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} isClickable={false} />
      <View style={styles.buttonContainer}>
        <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Reviews:</Text>}
      />
    </View>
  );
};

export default RepositoryScreen;
