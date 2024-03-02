import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation CREATE_USER($name: String!, $email: String!, $password: String!, $avatar: String, $scope: [String]!) {
      createUser(name: $name, email: $email, password: $password, avatar: $avatar, scope: $scope) {
        id
        name
        email
        avatar
      }
    }
  `

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      name
    }
  }
`;

export { CREATE_USER, LOGIN_USER, GET_ALL_USERS };