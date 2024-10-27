import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const result = await mutate({
        variables: { credentials: { username, password } },
      });

      console.log("Mutation result:", result);

      // Return the entire data object so onSubmit can access it
      return result.data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };


  return [signIn, result];
};

export default useSignIn;
