const _defaultTo = require('lodash/defaultTo');
const projectConfig = require('../src/project.config');
const cliDbConfig = require('./db/cli/config/config');
// DATABASE
const devDbConfig = cliDbConfig.development; // development default database
const prodDbConfig = cliDbConfig.production; // production default database

const defaultDbConfig = {
  'development': devDbConfig,
  'production': prodDbConfig
}[process.env.NODE_ENV || 'development'];

export const dbConfig = {
  host: _defaultTo(process.env.DB_HOST, defaultDbConfig.host),
  username: _defaultTo(process.env.DB_USER, defaultDbConfig.username),
  database: _defaultTo(process.env.DB_DATABASE, defaultDbConfig.database),
  password: _defaultTo(process.env.DB_DATABASE, defaultDbConfig.password),
  port: _defaultTo(process.env.DB_PORT, '5432')
};

dbConfig.url = `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

export const gitConfig = {
  clientId: projectConfig.GIT_CLIENT_ID, // used on the frontend
  accessTokenUrl: 'https://github.com/login/oauth/access_token',
  clientSecret: _defaultTo(process.env.GIT_CLIENT_SECRET, 'ddf654feec8b9272ff5a8f69e3790694f8e21165'),
  ghUrl: 'https://api.github.com',
};

export const apiConfig = {
  quiz: {
    questionLimit: 5,
    delayTime: 1000 * 60 * 60 * 24 // one day
  }
};

export default {
  devDbConfig,
  prodDbConfig,
  dbConfig
};
