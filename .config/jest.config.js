const fs = require('fs');
const path = require('path');
const { getGitRootPath } = require('arco-cli-dev-utils');

module.exports = {
  /**
   * @param config {import('arco-scripts').JestConfig}
   */
  node: (config) => {
    const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
    if (fs.existsSync(rootConfigPath)) {
      const { jest } = require(rootConfigPath);
      if (jest && jest.node) {
        config = jest.node(config) || config;
      }
    }

    config.moduleNameMapper = {
      '^arco-marterial-test-page/(.+)$': '<rootDir>/$1',
      '^arco-marterial-test-page$': '<rootDir>',
    };
  },
  /**
   * @param config {import('arco-scripts').JestConfig}
   */
  client: (config) => {
    const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
    if (fs.existsSync(rootConfigPath)) {
      const { jest } = require(rootConfigPath);
      if (jest && jest.client) {
        config = jest.client(config) || config;
      }
    }

    config.moduleNameMapper = {
      '^arco-marterial-test-page/(.+)$': '<rootDir>/$1',
      '^arco-marterial-test-page$': '<rootDir>',
    };
  },
};
