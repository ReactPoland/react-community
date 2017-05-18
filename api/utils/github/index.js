const request = require('request');
import { gitConfig } from '../../config';
import querystring from 'querystring';

export const getAccessToken = async ({ code, state }) => {
  return new Promise((resolve, reject) => {
    const bodyArgs = {
      client_id: gitConfig.clientId,
      client_secret: gitConfig.clientSecret,
      code,
      state
    };

    request({
      uri: gitConfig.accessTokenUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      form: bodyArgs
    }, (accessError, accessRes, body) => {
      if (!accessError) {
        resolve(body);
      } else {
        reject(accessError);
      }
    });
  })
    .then(body => querystring.parse(body) );
};

export const getUser = async ({ token }) => {
  return new Promise((resolve, reject) => {
    const uri = [gitConfig.ghUrl, 'user'].join('/');
    const queryParams = querystring.stringify({
      access_token: token,
    });

    request({
      uri: `${uri}?${queryParams}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Awesome-Octocat-App',
        'Content-Type': 'application/json'
      },
    }, (accessError, accessRes, body) => {
      if (!accessError) {
        resolve(body);
      } else {
        reject(accessError);
      }
    });
  })
    .then(body => JSON.parse(body) );
};
