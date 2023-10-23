const { getRepositories } = require('../controllers/repositoryController');
const { getRepositoryDetails } = require('../controllers/repositoryDetailsController');

module.exports = {
  resolvers: {
    Query: {
      repositories: () => getRepositories(),
      repositoryDetails: (_, { owner, name }) => getRepositoryDetails(owner, name),
    },
  },
};