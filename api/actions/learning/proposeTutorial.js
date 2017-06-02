const TopicProposeModel = require('../../db').topicProposes;
// const UserModel = require('../../db').users;

const proposeTutorialRequest = async ({ title }) => {
  return await TopicProposeModel.create({
    title
  });
};

function proposeTutorial(req) {
  return proposeTutorialRequest(req.body);
}

export default proposeTutorial;
