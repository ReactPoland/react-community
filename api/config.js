const _defaultTo = require('lodash/defaultTo');
const config = require('../src/config');
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
  authUrl: config.git.authUrl, // used on the frontend
  clientId: config.git.clientId, // used on the frontend
  redirectUrl: config.git.redirectUrl, // used on the frontend
  accessTokenUrl: 'https://github.com/login/oauth/access_token',
  clientSecret: _defaultTo(process.env.GIT_CLIENT_SECRET, 'ddf654feec8b9272ff5a8f69e3790694f8e21165'),
  ghUrl: 'https://api.github.com',
};

export default {
  devDbConfig,
  prodDbConfig,
  dbConfig
};
