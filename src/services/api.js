import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        status
        image
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
    }
  }
`;
