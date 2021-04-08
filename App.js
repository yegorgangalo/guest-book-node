require('dotenv').config();
const path = require('path')
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const commentsRouter = require('./routes/commentsRoutes')
const indexRouter = require('./routes/indexRoutes');

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
app.use('/api/comments', commentsRouter)

app.use((_req, res) => {
  res.status(404).send({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  console.log('error last 500');
  res.status(err.status || 500).send({ message: err.message.replace(/"/g, "") })
})

module.exports = app