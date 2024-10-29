import React from 'react';
import { View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  // Extract the repository nodes if data is available
  const repositories = data?.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  if (loading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Error: {error.message}</Text></View>;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
