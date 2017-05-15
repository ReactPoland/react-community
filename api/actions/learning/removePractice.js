const TutorialModel = require('../../db').tutorials;

const removePracticeRequest = async ({
  body
}) => {
  const { id } = body;

  return await TutorialModel.destroy({
    where: {
      type: 'bestpractice',
      id
    }
  });
};

function removePractice(req) {
  return req.permission.onlyStaff().then(() => {
    return removePracticeRequest(req);
  });
}

export default removePractice;
