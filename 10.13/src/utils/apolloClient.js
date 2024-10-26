import { ApolloClient, InMemoryCache } from '@apollo/client';


const createApolloClient = (apollo_uri) => {
  return new ApolloClient({
    uri: apollo_uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;