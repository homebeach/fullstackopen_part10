import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy = 'CREATED_AT', orderDirection = 'DESC', first = 10, after = '' } = {}) => {
  // Only include `after` in the query if it's not null or an empty string
  const variables = {
    orderBy,
    orderDirection,
    first,
    ...(after && { after }) // This ensures `after` is only added when it’s truthy
  };

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error, refetch };
};

export default useRepositories;
