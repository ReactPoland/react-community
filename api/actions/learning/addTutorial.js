const TutorialModel = require('../../db').tutorials;
// const sequelize = require('../../db').sequelize;
// import { getSlug } from '../../utils/slug';

const addTutorialRequest = async ({
  body,
  currentUser
}) => {
  const { title, content } = body;

  return await TutorialModel.create({
    title,
    content,
    type: 'tutorial',
    authorId: currentUser.id
  });
};

function addTutorial(req) {
  return req.permission.shouldAuth().then(() => {
    return addTutorialRequest(req);
  });
}

export default addTutorial;
