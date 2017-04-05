
const permMiddleware = () => (req, res, next) => {
  req.permission = {};
  req.permission.shouldAuth = async () => {
    if (!(req && req.session && req.session.user && req.session.user.id)) {
      throw {
        status: 401,
        message: 'Not authorized'
      };
    }

    return true;
  };

  next();
};

export default permMiddleware;
