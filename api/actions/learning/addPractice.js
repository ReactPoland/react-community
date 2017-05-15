const TutorialModel = require('../../db').tutorials;
import Log from '../../utils/log';

const addPracticeRequest = async ({
  body,
  currentUser
}) => {
  const { title, content } = body;

  const practiceItem = await TutorialModel.create({
    title,
    content,
    type: 'bestpractice',
    authorId: currentUser.id
  });

  await Log.addPractice({
    userId: currentUser.id,
    entityId: practiceItem.id
  });

  return practiceItem;
};

function addPractice(req) {
  return req.permission.onlyStaff().then(() => {
    return addPracticeRequest(req);
  });
}

export default addPractice;
