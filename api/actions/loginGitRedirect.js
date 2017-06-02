import * as GithubHelpers from '../utils/github';
const UserModel = require('../db').users;

const errorGenerator = (message) => {
  throw new Error(message);
};

const loginGitRequest = async (req) => {
  const { error, code, state } = req.query;
  const { session } = req;

  if (session.user) errorGenerator('loggedIn. You are logged in. Please logout before');

  if (error) errorGenerator(req.query.error_description);
  // TODO: check state property
  if (!state || !code) errorGenerator('emptyRoute. No state and code attributes');

  const gitTokenResponse = await GithubHelpers.getAccessToken({ code, state });

  const accessToken = gitTokenResponse.access_token;
  const userDataResponse = await GithubHelpers.getUser({ token: accessToken });

  // 1. find user in the db.
  const userResp = await UserModel.findOne({
    where: {
      ghID: userDataResponse.id
    }
  })
  .then(item => item && item.toJSON());

  let user;
  // 2. Create if doesn't exist
  if (!userResp) {
    user = await UserModel.create({
      pictureURL: userDataResponse.avatar_url,
      firstName: userDataResponse.name || 'Anonymous',
      lastName: '',
      ghID: userDataResponse.id
    })
    .then(item => item && item.toJSON());
  } else {
    user = userResp;
  }

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
