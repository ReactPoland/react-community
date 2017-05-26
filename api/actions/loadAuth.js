export default function loadAuth(req) {
  return req.permission.shouldAuth().then(() => {
    const resp = {};
    ['id', 'pictureURL', 'firstName', 'lastName', 'filledProfile', 'role', 'quizStats']
      .map(fieldName => resp[fieldName] = req.currentUser[fieldName]);

    return resp;
  })
  .catch(() => null);
}
