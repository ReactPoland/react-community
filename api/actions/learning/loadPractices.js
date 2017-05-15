const TutorialModel = require('../../db').tutorials;
const UserModel = require('../../db').users;

const loadPracticeRequest = async () => {
  return await TutorialModel.findAll({
    where: {
      type: 'bestpractice',
    },
    include: [{
      model: UserModel,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }]
  });
};

function loadPractice(req) {
  return loadPracticeRequest(req);
}

export default loadPractice;
