// RepositoryScreen.jsx
import React from 'react';
import { View, Button, Linking, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  buttonContainer: {
    alignSelf: 'center',  // Centers the button horizontally
    marginTop: 10,
    width: 200,  // Sets a fixed width for the button
  },
});

const RepositoryScreen = () => {
  const { repositoryId } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;

  return (
    <View style={styles.container}>
      {/* Pass isClickable as false to prevent clicking */}
      <RepositoryItem repository={repository} isClickable={false} />
      <View style={styles.buttonContainer}>
        <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
      </View>
    </View>
  );
};

export default RepositoryScreen;
