import gql from 'graphql-tag';

export const SAMPLE_URL = gql`
  {
    __schema {
      queryType: types {
        name
        kind
        fields {
          name
        }
        inputFields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  }
`;

export const GET_QUERY = gql`
  {
    __type(name: "Query") {
      name
      fields {
        name
        args {
          name
          type {
            kind
            name
          }
        }
        type {
          ofType {
            name
          }
        }
      }
    }
  }
`;

export const GET_SCHEMA = gql`
  query getSchema($currentQuery: String!) {
    __type(name: $currentQuery) {
      name
      inputFields {
        name
        type {
          name
          kind
          inputFields {
            name
            type {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_TYPES = gql`
  query getTypes($currentArgument: String!) {
    __type(name: $currentArgument) {
      name
      inputFields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;
