import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import AppBarTab from './AppBarTab';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: '#24292e',
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const isSignedIn = !!data?.me;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView} showsHorizontalScrollIndicator={true}>
        <AppBarTab title="Repositories" to="/" style={styles.tab} />

        {isSignedIn ? (
          <>
            <AppBarTab title="Create Review" to="/createreview" style={styles.tab} />
            <AppBarTab title="Sign Out" onPress={signOut} style={styles.tab} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign In" to="/signin" style={styles.tab} />
            <AppBarTab title="Sign Up" to="/signup" style={styles.tab} />  {/* New Sign Up tab */}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
