const TutorialModel = require('../../db').tutorials;
import Log from '../../utils/log';

const removeTutorialRequest = async ({
  body,
  currentUser
}) => {
  const { id } = body;

  const count = await TutorialModel.destroy({
    where: {
      type: 'tutorial',
      id
    }
  });

  if (count) {
    await Log.removeTutorial({
      entityId: id,
      userId: currentUser.id
    });
  }

  return count;
};

function removeTutorial(req) {
  return req.permission.onlyStaff().then(() => {
    return removeTutorialRequest(req);
  });
}

export default removeTutorial;
