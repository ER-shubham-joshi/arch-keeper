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
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export { CREATE_USER, LOGIN_USER };