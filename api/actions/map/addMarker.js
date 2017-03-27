export default function addMarker(data) {
  return new Promise((resolve) => {
    // Make async call to database
    setTimeout(() => {
      const marker = {
        id: Date.now(),
        ...data.body
      };

      resolve({ marker });
    }, 2000); // Simulate async load
  });
}
