const axios = require('axios');

require('dotenv').config();

const getRepositoryDetails = async (owner, name) => {
    try {
      const response = await axios.get(`${process.env.REPO_URL}/${owner}/${name}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });
  
      const repo = response.data;
  
      // Function to recursively scan for YAML files
      const scanForYamlFiles = async (path) => {
        const filesResponse = await axios.get(`${process.env.REPO_URL}/${owner}/${name}/contents/${path}`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        });
  
        const numFiles = filesResponse.data.length;
        let ymlContent = '';
  
        for (const file of filesResponse.data) {
          if (file.type === 'file' && file.name.endsWith('.yml')) {
            // Fetch content of the YAML file
            const contentResponse = await axios.get(file.download_url);
            ymlContent = contentResponse.data;
            break;
          } else if (file.type === 'dir') {
            // Recursively scan subdirectory
            const subdirectoryPath = `${path}/${file.name}`;
            const subdirectoryYamlContent = await scanForYamlFiles(subdirectoryPath);
            if (subdirectoryYamlContent) {
              ymlContent = subdirectoryYamlContent;
              break;
            }
          }
        }
  
        return ymlContent;
      };
  
      // Start scanning from the root directory
      const ymlContent = await scanForYamlFiles('');
  
  
      // Fetch number of files
      const noOfFiles = await axios.get(`${process.env.REPO_URL}/${owner}/${name}/contents`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });
  
      const numFiles = noOfFiles.data.length;
  
      // Fetch active webhooks
      const webhooksResponse = await axios.get(`${process.env.REPO_URL}/${owner}/${name}/hooks`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });
  
      const activeWebhooks = webhooksResponse.data.length;
  
      return {
        name: repo.name,
        size: repo.size,
        owner: repo.owner.login,
        isPrivate: repo.private,
        numFiles,
        ymlContent,
        activeWebhooks,
      };
    } catch (error) {
      throw new Error('Failed to fetch repository details from GitHub API');
    }
  };
  
  
  module.exports = {
    getRepositoryDetails : getRepositoryDetails,
  }