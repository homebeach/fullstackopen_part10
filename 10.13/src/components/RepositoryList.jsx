import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // Directly use useQuery here
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  // Show loading state
  if (loading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Error: {error.message}</Text></View>;

  // Get the nodes from the edges array
  const repositoryNodes = data?.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
