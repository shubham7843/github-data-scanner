const { gql } = require('apollo-server');

module.exports = {
  typeDefs: gql`
  type Repository {
    name: String
    size: Int
    owner: String
    isPrivate: Boolean
    numFiles: Int
    ymlContent: String
    activeWebhooks: Int
  }

  type Query {
    repositories: [Repository]
    repositoryDetails(owner: String!, name: String!): Repository
  }
  `
};
