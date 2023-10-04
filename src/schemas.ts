const Query = `#graphql
type Query {
  listRepo: [Repository]
  repoDetails(repoName: String!): Repository
}
`;
const Repository = `#graphql
type Repository {
   name: String!
   size: Int!
   owner: [String]!
   private: Boolean!
   fileCount: Int!
   ymlContent: String
   isWebhook: Boolean!
 }
`;
const typeDefs=[Query, Repository];

export { typeDefs }