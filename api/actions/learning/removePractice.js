const TutorialModel = require('../../db').tutorials;
import Log from '../../utils/log';

const removePracticeRequest = async ({
  body,
  currentUser
}) => {
  const { id } = body;

  const count = await TutorialModel.destroy({
    where: {
      type: 'bestpractice',
      id
    }
  });

  if (count) {
    await Log.removePractice({
      entityId: id,
      userId: currentUser.id
    });
  }

  return count;
};

function removePractice(req) {
  return req.permission.onlyStaff().then(() => {
    return removePracticeRequest(req);
  });
}

export default removePractice;
