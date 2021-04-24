const db = require('./db');
const app = require('../App');
const PORT = process.env.PORT || 3003;

db.then(() => {
  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
});

// async function start() {
//   try {
//     await db;
//     app.listen(PORT, () => {
//       console.log("starting listening on port", PORT);
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// start()
