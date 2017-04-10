// TODO: Mocked - replace wth real code
import _random from 'lodash/random';
import _times from 'lodash/times';
import _sample from 'lodash/sample';
import loremIpsum from 'lorem-ipsum';

const firstNames = ['John', 'Jack', 'Peter', 'Mary', 'Suzy', 'Anne'];
const lastNames = ['Johnson', 'Jackson', 'Peterson', 'Smith', 'Brown', 'Gomez'];

const event = (id) => ({
  id,
  title: loremIpsum({ count: _random(3, 6), units: 'words' }),
  link: 'http://link.com',
  googleLocalId: 'asd78sad678',
  lat: _random(-20, 20),
  lng: _random(-50, 50),
  price: `$${_random(0, 100)}`,
  date: _random(1491865500675, 1510000000000),
  organizedBy: `${_sample(firstNames)} ${_sample(lastNames)}`,
  pictureUrl: `https://placebear.com/${_random(70, 100)}/${_random(70, 100)}`,
  description: loremIpsum({ count: _random(1, 2), units: 'sentences' })
});

export default () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ message: _times(20, event) });
  }, 500);
});
