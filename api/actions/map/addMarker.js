const MarkerModel = require('../../db').markers;
const resp = require('../../utils/serverResp');

const addMarkerRequest = async ({name, link, description, lat, lng}) => {
  return await MarkerModel.create({
    name, link, description, lat, lng
  })
  .then(respMess => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

function addMarket(data) {
  return data.permission.shouldAuth().then(() => addMarkerRequest(data.body));
}

export default addMarket;

// export default function addMarker(data) {
//   return new Promise((resolve) => {
//     // Make async call to database
//     setTimeout(() => {
//       const marker = {
//         id: Date.now(),
//         ...data.body
//       };
// //
//       resolve({ marker });
//     }, 2000); // Simulate async load
//   });
// }
