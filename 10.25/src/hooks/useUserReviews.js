// hooks/useUserReviews.js
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useUserReviews = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  return { reviews, loading, error, refetch };
};

export default useUserReviews;
