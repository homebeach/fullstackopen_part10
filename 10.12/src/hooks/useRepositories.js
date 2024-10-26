import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  // Use Apollo's useQuery to fetch repositories
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  // Extract the repository nodes if data is available
  const repositories = data?.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return { repositories, loading, error, refetch };
};

export default useRepositories;
