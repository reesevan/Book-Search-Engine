import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const QUERY_BOOKS = gql`
  query searchBooks($query: String!) {
    searchBooks(query: $query) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;
