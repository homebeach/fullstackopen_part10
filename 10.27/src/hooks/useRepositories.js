import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ 
  orderBy = 'CREATED_AT', 
  orderDirection = 'DESC', 
  first = 10, 
  after = '', 
  searchKeyword = '' 
} = {}) => {
  
  // Only include `after` and `searchKeyword` in the query if they're not empty
  const variables = {
    orderBy,
    orderDirection,
    first,
    ...(after && { after }), // Include `after` only if it’s truthy
    ...(searchKeyword && { searchKeyword }) // Include `searchKeyword` only if it’s truthy
  };

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error, refetch };
};

export default useRepositories;
