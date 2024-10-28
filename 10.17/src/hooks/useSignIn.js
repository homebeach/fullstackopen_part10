import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      const accessToken = data.authenticate.accessToken;

      // Store the access token
      await authStorage.setAccessToken(accessToken);

      // Reset the Apollo Client store to clear the cache
      await apolloClient.resetStore();

      // Return the data for any further handling
      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
