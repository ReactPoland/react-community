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
