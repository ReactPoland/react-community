export default function loadAuth(req) {
  let resp = null;
  const { user } = req.session;
  if (user) {
    resp = {};
    ['id', 'pictureURL', 'firstName', 'lastName']
      .map(fieldName => resp[fieldName] = resp[fieldName]);
  }

  return Promise.resolve(resp);
}
