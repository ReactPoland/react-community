const UserModel = require('../../db').users;

const fillProfileDataReques = async ({ body, session }) => {
  if (!body) throw new Error('bad request');

  const currentUser = await UserModel.findById(session.user.id);

  const userProfileData = {};
  ['firstName', 'lastName', 'pictureURL'].map(fieldName => {
    userProfileData[fieldName] = body[fieldName] || currentUser[fieldName];
  });

  const updatedUser = await currentUser.updateAttributes({
    filledProfile: true,
    ...userProfileData
  });

  return updatedUser;
};

const fillProfileData = (req) => {
  return req.permission.shouldAuth().then(() => fillProfileDataReques(req));
};

export default fillProfileData;
