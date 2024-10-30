// RepositoryList.js
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { RepositoryListContainer } from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const [selectedOrder, setSelectedOrder] = useState('latest');

  // Determine sorting parameters based on selected order
  const orderBy = selectedOrder === 'highest' || selectedOrder === 'lowest' ? 'RATING_AVERAGE' : 'CREATED_AT';
  const orderDirection = selectedOrder === 'lowest' ? 'ASC' : 'DESC';

  const { data } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
    first: 10,
  });

  const repositories = data ? data.repositories.edges.map(edge => edge.node) : [];

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
    />
  );
};

export default RepositoryList;
