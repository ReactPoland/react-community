const MarkerModel = require('../../db').markers;

/**
  @api {GET} /api/map/loadMarkers/ Load marker list
  @apiDescription Fetch all markers from the database
  @apiName Fetch markers
  @apiGroup Map

  @apiExample Example request:
  GET /api/map/loadMarkers HTTP/1.1

  @apiSuccessExample Example data on success:
  {
    "message": [
      {
        "id": 9,
        "name": "eretr",
        "link": "http://ertert",
        "description": "wertret",
        "lat": 51.5073509,
        "lng": -0.127758299999982,
        "googleLocationId": "6b893c3d05bf5fb2caa4b033c9aa27a41fab6fc3",
        "createdAt": "2017-03-28T21:48:20.072Z",
        "updatedAt": "2017-03-28T21:48:20.072Z"
      },
      {
        "id": 11,
        "name": "eee",
        "link": "http://eee",
        "description": "eee",
        "lat": 40.2276093,
        "lng": -7.53051959999993,
        "googleLocationId": "6b893c3d05bf5fb2caa4b033c9aa27a41fab6fc3",
        "createdAt": "2017-03-29T09:56:45.805Z",
        "updatedAt": "2017-03-29T09:56:45.805Z"
      }
    ],
    "type": "success"
  },
 */

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
