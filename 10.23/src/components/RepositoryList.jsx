// RepositoryList.js
import React, { useState } from 'react';
import { RepositoryListContainer } from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');

  // Determine sorting parameters based on selected order
  const orderBy = selectedOrder === 'highest' || selectedOrder === 'lowest' ? 'RATING_AVERAGE' : 'CREATED_AT';
  const orderDirection = selectedOrder === 'lowest' ? 'ASC' : 'DESC';

  const { data, loading, error, refetch } = useRepositories({ orderBy, orderDirection, first: 10 });

  const repositories = data ? data.repositories.edges.map(edge => edge.node) : [];

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
    />
  );
};

export default RepositoryList;
