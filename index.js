require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const { CommentModel } = require('./models/models')
const { getDataMongo, postDataMongo } = require('./api/apilogic');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/comments', getDataMongo(CommentModel));
app.post('/comments', postDataMongo(CommentModel));

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
  } catch (e) {
    console.log(e)
  }
};

start();