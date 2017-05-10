const MarkerModel = require('../../db').markers;

const loadMarkersRequest = async () => {
  return await MarkerModel.findAll({});
};

const loadMarkers = () => loadMarkersRequest();

export default loadMarkers;


// const initialMarkers = [
//   {
//     id: 0,
//     name: 'Test marker name lorem ipsum sit lorem',
//     link: 'http://google.com/',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     lat: 52.505, lng: 1.09
//   },
//   {
//     id: 1,
//     name: 'Test marker name lorem ipsum sit lorem',
//     link: 'http://google.com/',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     lat: 51.505, lng: -0.09
//   }
// ];

// export default function loadMarkers() {
  // return new Promise((resolve) => {
    // Make async call to database
    // setTimeout(() => {
      // resolve(initialMarkers);
    // }, 2000); // Simulate async load
  // });
// }
