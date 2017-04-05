/**
  @api {post} /api/logout/ Logout user
  @apiDescription Logout user and destroy session object.
  @apiName Logout
  @apiGroup General

  @apiExample Example usage:
  GET /api/logout/ HTTP/1.1

  @apiSuccessExample Example data on success:
  null
 */

const destroySession = async (req) => {
  const sessState = await new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      req.session = null;
      resolve(null);
    });
  });

  return sessState;
};

const logout = (req) => {
  return req.permission.shouldAuth().then(() => destroySession(req));
};

export default logout;
