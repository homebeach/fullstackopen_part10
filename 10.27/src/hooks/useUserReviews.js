// hooks/useUserReviews.js
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useUserReviews = (includeReviews = false) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews, first: 5 }, // Set an initial limit (5)
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];
  const pageInfo = data?.me?.reviews?.pageInfo;

  // Define a handler to load more reviews if more are available
  const handleFetchMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 5, // Load in increments of 5 (or adjust as needed)
        },
      });
    }
  };

  return { reviews, loading, error, refetch, fetchMore: handleFetchMore, pageInfo };
};

export default useUserReviews;
