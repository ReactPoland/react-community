const rand = require('random-seed').create();

export const getUniqueRandomRange = ({ size, max }) => {
  const uniqueRange = [];

  (new Array(size))
    .fill(1)
    .forEach(() => {
      let val;
      do {
        val = rand(max);
      }
      while (uniqueRange.includes(val));
      uniqueRange.push(val);
    });
  return uniqueRange;
};
