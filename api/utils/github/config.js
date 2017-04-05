const gitConf = {
  authUrl: 'https://github.com/login/oauth/authorize',
  clientId: 'a5ed526682843ecc1b68',
  redirectUrl: 'http://localhost:3000/api/loginGitRedirect/',
  accessTokenUrl: 'https://github.com/login/oauth/access_token',
  clientSecret: 'ddf654feec8b9272ff5a8f69e3790694f8e21165',
  ghUrl: 'https://api.github.com',
};

module.exports = {
  getAuthLink: () => {
    const state = Math.floor(Math.random() * 10000);
    return `${gitConf.authUrl}/?client_id=${gitConf.clientId}&redirect_uri=${gitConf.redirectUrl}&state=${state}`;
  },
  ...gitConf
};
