import _find from 'lodash/find';
import _random from 'lodash/random';
import _times from 'lodash/times';


const comment = (id) => ({
  id,
  comments: _times(_random(0, 10), (ind) => ({
    id: ind,
    message: `${_random(123123, 3234234)}`
  }))
});

const conversations = _times(200, comment);

function loadConversationRequest(body) {
  return new Promise((resolve, reject) => {
    // Make async call to database
    setTimeout(() => {
      if (Math.random() < 0.10) {
        reject({ message: 'GET CONVERSATION ERROR 😡' });
      } else {
        resolve({ message: _find(conversations, { id: body.id }) });
      }
    }, 2000);
  });
}

const loadConversation = (data) => loadConversationRequest(data.body);

export default loadConversation;
