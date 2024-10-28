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

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;