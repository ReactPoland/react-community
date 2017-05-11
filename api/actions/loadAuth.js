export default function loadAuth(req) {
  let resp = null;
  const { user } = req.session;
  if (user) {
    resp = {};
    ['id', 'pictureURL', 'firstName', 'lastName', 'filledProfile', 'role']
      .map(fieldName => resp[fieldName] = user[fieldName]);
  }

  return Promise.resolve(resp);
}
