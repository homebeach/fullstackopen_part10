import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Repositories {
  repositories {
    totalCount
    edges {
      node {
        id,
        name,
        ownerName,
        createdAt,
        fullName,
        reviewCount,
        ratingAverage,
        forksCount,
        stargazersCount,
        description,
        language,
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

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;