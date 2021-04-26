const { connect, connection } = require('mongoose');
require('dotenv').config();
require('colors');

const uriDb = process.env.URI_DB;

const db = connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection.on('connected', () => {
  console.log('Database successfully connected'.green);
});

connection.on('error', err => {
  console.log(`Database error connection: ${err.message}`.red);
});

connection.on('disconnected', () => {
  console.log('Database disconnected'.yellow);
});

process.on('SIGINT', async () => {
  await connection.close();
  console.log('Connection for db closed and app terminated'.red);
  process.exit(1);
});

module.exports = db;
