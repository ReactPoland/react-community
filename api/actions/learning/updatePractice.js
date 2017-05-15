const TutorialModel = require('../../db').tutorials;
const UserModel = require('../../db').users;
import Log from '../../utils/log';

const updatePracticeRequest = async ({
  body,
  currentUser
}) => {
  const { title, content, id } = body;
  const currentPractice = await TutorialModel.findOne({
    where: {
      type: 'bestpractice',
      id
    },
    include: [{
      model: UserModel,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }]
  });

  if (!currentPractice) throw new Error('Practice not found');
  const updatingValues = {};
  if (title) updatingValues.title = title;
  if (content) updatingValues.content = content;

  const updatedPractice = await currentPractice.updateAttributes(updatingValues);

  await Log.updatePractice({
    userId: currentUser.id,
    entityId: updatedPractice.id
  });

  return updatedPractice;
};

function updatePractice(req) {
  return req.permission.onlyStaff().then(() => {
    return updatePracticeRequest(req);
  });
}

export default updatePractice;
