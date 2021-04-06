const app = require('./App')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3003;

async function start() {
  try {
    await mongoose.connect(
      process.env.URI_DB,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log("starting listening on port", PORT);
    })
  } catch (err) {
    console.log(err)
  }
}

start()