import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
        cursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      name
      ownerName
      createdAt
      reviewCount
      ratingAverage
      forksCount
      stargazersCount
      description
      language
      ownerAvatarUrl
    }
  }
`;

export const GET_REVIEWS = gql`
  query Reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;