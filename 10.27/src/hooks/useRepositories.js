// useRepositories.js
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ 
  orderBy = 'CREATED_AT', 
  orderDirection = 'DESC', 
  first = 10, 
  searchKeyword = '' 
} = {}) => {
  
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      first,
      searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true, // Allows loading indicators for fetchMore
  });

  // Wrapped fetchMore function to load additional pages
  const handleFetchMore = () => {
    if (data?.repositories.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy,
          orderDirection,
          first,
          searchKeyword,
        },
      });
    }
  };

  return { data, loading, error, refetch, fetchMore: handleFetchMore }; // Return fetchMore
};

export default useRepositories;
