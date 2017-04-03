export default function login(req) {
  const user = {
    id: req.body.id
  };
  req.session.user = user;
  return Promise.resolve(user);
}
