const UserModel = require('../db').users;

const genError = (message, status = 401) => ({ status, message });

const permMiddleware = () => (req, res, next) => {
  req.permission = {};
  req.permission.shouldAuth = async (filter) => {
    if (!(req && req.session && req.session.user && req.session.user.id)) {
      throw genError('Not authorized');
    }

    const currentUser = await UserModel.findOne({
      where: { id: req.session.user.id }
    }).then(item => item.toJSON());

    if (filter) {
      const { role } = filter;
      if (role !== undefined && currentUser.role !== role) throw genError('Unprivileged user');
    }

    req.currentUser = currentUser;

    return currentUser;
  };

  req.permission.onlyStaff = async () => await req.permission.shouldAuth({ role: 'staff' });

  next();
};

export default permMiddleware;
