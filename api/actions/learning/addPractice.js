const TutorialModel = require('../../db').tutorials;

const addPracticeRequest = async ({
  body,
  currentUser
}) => {
  const { title, content } = body;

  return await TutorialModel.create({
    title,
    content,
    type: 'bestpractice',
    authorId: currentUser.id
  });
};

function addPractice(req) {
  return req.permission.onlyStaff().then(() => {
    return addPracticeRequest(req);
  });
}

export default addPractice;
