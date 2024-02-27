module.exports = `
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  avatar: String
  theme: String
}

type AuthPayload {
  token: String
}

type Query {
  getUser(id: ID!): User
  getAllUsers: [User]
}

type Mutation {
  createUser(name: String!, email: String!, password: String!, scope: [String]!, avatar: String, theme: String): User
  login(email: String!, password: String!): AuthPayload
}
`
