require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const commentsRouter = require('./routes/comments')
const indexRouter = require('./routes/index');

const PORT = process.env.PORT || 3003;

const app = express();

const hbs = exphbs.create({
  defaultLayout: '../index',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const loggerMode = process.env.NODE_ENV === 'development' ? 'dev' : 'short'
app.use(logger(loggerMode))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/comments', commentsRouter)

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
}

start()