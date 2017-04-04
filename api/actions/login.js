/**
  @api {post} /api/login/ Login user
  @apiDescription Login user and write ID into session. It is a temporary solution and will be updated after authorization flow.
  @apiName Login
  @apiGroup General

  @apiParam {Number} id Users unique ID.

  @apiExample Example usage:
  POST /api/login/ HTTP/1.1

  {
    "id": 1
  }
  @apiSuccessExample Example data on success:
  {
    "id": 1
  }
 */

export default function login(req) {
  const user = {
    id: req.body.id
  };
  req.session.user = user;
  return Promise.resolve(user);
}
