const TutorialModel = require('../../db').tutorials;
const UserModel = require('../../db').users;

const loadTutorialRequest = async () => {
  return await TutorialModel.findAll({
    where: {
      type: 'tutorial',
    },
    include: [{
      model: UserModel,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }]
  });
};

function loadTutorial(req) {
  return loadTutorialRequest(req.body);
}

export default loadTutorial;
