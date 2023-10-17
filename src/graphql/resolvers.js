const { getRepositories, getRepositoryDetails } = require('../controllers/repositoryController');

module.exports = {
  resolvers: {
    Query: {
      repositories: () => getRepositories(),
      repositoryDetails: (_, { owner, name }) => getRepositoryDetails(owner, name),
    },
  },
};