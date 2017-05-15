import * as GithubHelpers from '../utils/github';
const UserModel = require('../db').users;

const errorResponse = (error, message) => ({
  error, message
});

const loginGitRequest = async (req) => {
  const { error, code, state } = req.query;
  const { session } = req;

  if (session.user) return errorResponse('loggedIn', 'You are logged in. Please logout before');

  if (error) return errorResponse(error, req.query.error_description);
  // TODO: check state property
  if (!state || !code) return errorResponse('emptyRoute', 'No state and code attributes');

  const gitTokenResponse = await GithubHelpers.getAccessToken({ code, state })
    .catch(err => ({ error: 'tokenAccess', error_description: err && err.message }) );

  if (gitTokenResponse.error) return errorResponse(gitTokenResponse.error, gitTokenResponse.error_description);

  const accessToken = gitTokenResponse.access_token;
  const userDataResponse = await GithubHelpers.getUser({ token: accessToken })
    .catch(err => ({ error: 'fetchData', error_description: err && err.message }) );

  if (userDataResponse.error) return errorResponse(userDataResponse.error, userDataResponse.error_description);

  // 1. find user in the db.
  const userResp = await UserModel.findOne({
    where: {
      ghID: userDataResponse.id
    }
  })
  .then(item => item && item.toJSON())
  .catch(err => ({ error: 'findUserRequest', error_description: err && err.message }));

  if (userResp && userResp.error) return errorResponse(userResp.error, userResp.error_description);

  let user;
  // 2. Create if doesn't exist
  if (!userResp) {
    user = await UserModel.create({
      pictureURL: userDataResponse.avatar_url,
      firstName: userDataResponse.name || 'Anonymous',
      lastName: '',
      ghID: userDataResponse.id
    })
    .then(item => item && item.toJSON())
    .catch(err => ({ error: 'createUser', error_description: err && err.message}));
  } else {
    user = userResp;
  }

  if (user && user.error) return errorResponse(user.error, user.error_description);

  // 3. Write to session
  session.user = {
    id: user.id
  };

  // fix bug related with SSR request and old session
  return await new Promise((resolve, reject) => {
    req.session.save(() => {
      // 4. Redirect to profile or main page
      reject({
        redirect: '/',
        name: 'successRedirect',
        message: 'Here is a redirect'
      });
    });
  });
};

const loginGit = (req) => loginGitRequest(req);

export default loginGit;
