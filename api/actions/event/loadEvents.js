const resp = require('../../utils/serverResp');
const EventModel = require('../../db').events;
const UserModel = require('../../db').users;

const loadEventsRequest = async () => {
  const eventsResp = await EventModel.findAll({
    attributes: ['id', 'price', 'date', 'title', 'link', 'description', 'lat', 'lng', 'googleLocationId', 'createdAt', 'updatedAt'],
    include: [{
      model: UserModel,
      as: 'organizedBy',
      id: 'id',
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }]
  })
    .then(items => resp.success(items))
    .catch(err => err);

  if (! (eventsResp.type === 'success') ) throw resp.error(eventsResp.message);

  // const comments = await conversResp.item.getEvents({
  //   attributes: ['id', 'body', 'conversationId', 'createdAt', 'updatedAt', 'depth'],
  //   include: [{
  //     model: UserModel,
  //     attributes: ['id', 'firstName', 'lastName', 'pictureURL']
  //   }],
  //   order: [
  //     [ 'createdAt', 'DESC']
  //   ]
  // })
  // .then(commentsResponse => resp.success(commentsResponse))
  // .catch(err => resp.error(err.message));

  // const authorsId = comments.map(commentItem => commentItem.userId);
  // UserModel.findAll({ where: {
    // id:
  // }})
  // console.log();

  return eventsResp;
};

const loadEvents = (req) => loadEventsRequest(req);

export default loadEvents;
