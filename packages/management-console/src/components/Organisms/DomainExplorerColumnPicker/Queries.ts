import gql from 'graphql-tag';

export const GET_PICKER = gql`
  query getPicker($columnPickerType: String!) {
    __type(name: $columnPickerType) {
      name
      fields {
        name
        type {
          name
          kind
          fields {
            name
          }
        }
      }
    }
  }
`;
