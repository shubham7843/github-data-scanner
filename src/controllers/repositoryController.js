const { Repository } = require('../models/repository');
const axios = require('axios');
var promiseLimit = require('promise-limit')
var limit = promiseLimit(2)

require('dotenv').config();

const getRepositories = async () => {
  try {
    // Fetch data from GitHub API and create Repository instances
    const response = await axios.get(process.env.USER_REPOS, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const repositories = await Promise.all(
      response.data.map(repo => {
        return limit(() => new Repository(
          repo.name,
          repo.size,
          repo.owner.login,
          repo.private
        ));
      })
    );

    return repositories;
  } catch (error) {
    console.log("error : ",error);
    throw new Error('Failed to fetch repositories from GitHub API');
  }
};

module.exports = {
  getRepositories : getRepositories,
}
