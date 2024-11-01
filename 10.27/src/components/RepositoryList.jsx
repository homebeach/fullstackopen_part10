// RepositoryList.js
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { RepositoryListContainer } from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedOrder, setSelectedOrder] = useState('latest');

  const orderBy = selectedOrder === 'highest' || selectedOrder === 'lowest' ? 'RATING_AVERAGE' : 'CREATED_AT';
  const orderDirection = selectedOrder === 'lowest' ? 'ASC' : 'DESC';

  const { data, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
    first: 5,
  });

  const repositories = data ? data.repositories.edges.map(edge => edge.node) : [];

  const handleFetchMore = () => {
    const canFetchMore = !data || data.repositories.pageInfo.hasNextPage;
    if (canFetchMore) {
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy,
          orderDirection,
          searchKeyword: debouncedSearchQuery,
          first: 5,
        },
      });
    }
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
      onEndReached={handleFetchMore} // Pass fetch more handler
    />
  );
};

export default RepositoryList;
