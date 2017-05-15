const TutorialModel = require('../../db').tutorials;
const UserModel = require('../../db').users;

const updateTutorialRequest = async ({
  body
}) => {
  const { title, content, id } = body;
  const currentPractice = await TutorialModel.findOne({
    where: {
      type: 'tutorial',
      id
    },
    include: [{
      model: UserModel,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }]
  });

  if (!currentPractice) throw new Error('Tutorial not found');
  const updatingValues = {};
  if (title) updatingValues.title = title;
  if (content) updatingValues.content = content;

  const updatedPractice = await currentPractice.updateAttributes(updatingValues);

  return updatedPractice;
};

function updateTutorial(req) {
  return req.permission.onlyStaff().then(() => {
    return updateTutorialRequest(req);
  });
}

export default updateTutorial;
