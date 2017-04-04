import _find from 'lodash/find';
import _random from 'lodash/random';
import _times from 'lodash/times';
import _sample from 'lodash/sample';
import loremIpsum from 'lorem-ipsum';

const firstNames = ['John', 'Jack', 'Peter', 'Mary', 'Suzy', 'Anne'];
const lastNames = ['Johnson', 'Jackson', 'Peterson', 'Smith', 'Brown', 'Gomez'];

const comment = (id) => ({
  id,
  author: `${_sample(firstNames)} ${_sample(lastNames)}`,
  pictureUrl: `https://placebear.com/${_random(70, 100)}/${_random(70, 100)}`,
  message: loremIpsum({ count: _random(1, 3), units: 'sentences' })
});

const commentWitheReplies = (id) => {
  const com = comment(id);
  com.replies = _times(_random(0, 5), comment);
  return com;
};

const conversation = (id) => ({
  id,
  comments: _times(_random(0, 25), commentWitheReplies)
});

const conversations = _times(200, conversation);

function loadConversationRequest(body) {
  return new Promise((resolve, reject) => {
    // Make async call to database
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject({ message: 'RANDOM TEST ERROR 😡' });
      } else {
        resolve({ message: _find(conversations, { id: body.id }) });
      }
    }, 500);
  });
}

const loadConversation = (data) => loadConversationRequest(data.body);

export default loadConversation;
