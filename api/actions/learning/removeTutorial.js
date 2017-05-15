const TutorialModel = require('../../db').tutorials;

const removeTutorialRequest = async ({
  body
}) => {
  const { id } = body;

  return await TutorialModel.destroy({
    where: {
      type: 'tutorial',
      id
    }
  });
};

function removeTutorial(req) {
  return req.permission.onlyStaff().then(() => {
    return removeTutorialRequest(req);
  });
}

export default removeTutorial;
