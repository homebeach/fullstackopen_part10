// components/RepositoryScreen.js
import React from 'react';
import { View, Button, Linking, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    width: 200,
  },
  separator: {
    height: 10,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

const RepositoryScreen = () => {
  const { repositoryId } = useParams();

  const { data: repoData, loading: repoLoading, error: repoError } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  });

  const {
    data: reviewsData,
    error: reviewsError,
    fetchMore,
    networkStatus,
  } = useQuery(GET_REVIEWS, {
    variables: { repositoryId, first: 10 }, // Increase `first` to load more per fetch
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  if (repoLoading) return <Text>Loading repository...</Text>;
  if (repoError) return <Text>Error loading repository: {repoError.message}</Text>;
  if (reviewsError) return <Text>Error loading reviews: {reviewsError.message}</Text>;

  const repository = repoData.repository;
  const reviews = reviewsData ? reviewsData.repository.reviews.edges.map((edge) => edge.node) : [];

  const handleFetchMore = () => {
    const canFetchMore = reviewsData?.repository.reviews.pageInfo.hasNextPage;
    if (canFetchMore && networkStatus !== 3) { // 3 indicates fetchMore is in progress
      fetchMore({
        variables: {
          after: reviewsData.repository.reviews.pageInfo.endCursor,
          repositoryId,
          first: 10, // Increase `first` to reduce frequency of fetches
        },
      });
    }
  };

  const renderReviewItem = ({ item }) => (
    <ReviewItem review={item} showDeleteButton={false} showButtons={false} />
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
        ListFooterComponent={
          networkStatus === 3 ? (
            <ActivityIndicator style={styles.loadingIndicator} />
          ) : null
        }
        onEndReached={handleFetchMore} // Trigger fetchMore when end is reached
        onEndReachedThreshold={0.1} // Lower threshold to load closer to end
      />
    </View>
  );
};

export default RepositoryScreen;
