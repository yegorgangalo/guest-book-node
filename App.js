require('dotenv').config();
const path = require('path')
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const commentsRouter = require('./routes/comments')
const indexRouter = require('./routes/index');

const app = express();

const hbs = exphbs.create({
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const loggerMode = process.env.NODE_ENV === 'development' ? 'dev' : 'short'
app.use(logger(loggerMode))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/comments', commentsRouter)

module.exports = app