const app = require('./App');
const PORT = process.env.PORT || 3003;
const { sequelize } = require('./db/dbMySQL');

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('All models were synchronized successfully!');
    app.listen(PORT, () => {
      console.log('starting listening on port', PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

start();

// const app = require('./App')
// const PORT = process.env.PORT || 3003;
// const mongoose = require('mongoose')

// async function start() {
//   try {
//     await mongoose.connect(
//       process.env.URI_DB,
//       {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useFindAndModify: false
//       }
//     )
//     app.listen(PORT, () => {
//       console.log("starting listening on port", PORT);
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// start()
