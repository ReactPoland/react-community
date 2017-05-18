require('babel-polyfill');
const _defaultTo = require('lodash/defaultTo');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

// prepare git redirect hostname
let gitRedirectHost = process.env.HOST || 'localhost';

let gitRedirectPort;

if (!environment.isProduction) {
  gitRedirectPort = _defaultTo(process.env.PORT, '3000');
}

if (gitRedirectPort) {
  gitRedirectHost += ':' + gitRedirectPort;
}

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  git: {
    clientId: _defaultTo(process.env.GIT_CLIENT_ID, 'a5ed526682843ecc1b68'),
    redirectUrl: `http://${gitRedirectHost}/api/loginGitRedirect/`,
    authUrl: 'https://github.com/login/oauth/authorize',
  },
  googleMapsKey: 'AIzaSyCD3X-Lrhc7YL0WlC6LceHVH9LzshluPd0',
  app: {
    title: 'React Community',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React Redux Example: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
