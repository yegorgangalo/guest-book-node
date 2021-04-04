require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const { CommentModel } = require('./models/models')
const { getDataMongo, postDataMongo, deleteDataMongo, patchDataMongo, renderMainServerPage } = require('./api/apilogic');

const PORT = process.env.PORT || 3003;

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', renderMainServerPage())
app.get('/comments', getDataMongo(CommentModel));
app.post('/comments', postDataMongo(CommentModel));
app.delete('/comments/:id', deleteDataMongo(CommentModel));
app.patch('/comments/:id', patchDataMongo(CommentModel));

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