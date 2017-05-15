const TutorialModel = require('../../db').tutorials;
import Log from '../../utils/log';

const addTutorialRequest = async ({
  body,
  currentUser
}) => {
  const { title, content } = body;

  const tutorialItem = await TutorialModel.create({
    title,
    content,
    type: 'tutorial',
    authorId: currentUser.id
  });

  await Log.addTutorial({
    userId: currentUser.id,
    entityId: tutorialItem.id
  });

  return tutorialItem;
};

function addTutorial(req) {
  return req.permission.shouldAuth().then(() => {
    return addTutorialRequest(req);
  });
}

export default addTutorial;
