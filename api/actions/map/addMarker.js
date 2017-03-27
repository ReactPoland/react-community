export default function addMarker() {
  return new Promise((resolve, reject) => {
    // Make async call to database
    setTimeout(() => {
      reject('Test error sdsdf sdfsdf');
    }, 2000); // Simulate async load
  });
}

// export default function addMarker(data) {
//   return new Promise((resolve) => {
//     // Make async call to database
//     setTimeout(() => {
//       const marker = {
//         id: Date.now(),
//         ...data.body
//       };
//
//       resolve({ marker });
//     }, 2000); // Simulate async load
//   });
// }
