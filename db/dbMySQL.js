const { Sequelize, DataTypes } = require('sequelize');
const { NAME_DB, LOGIN_DB, PASSWORD_DB } = process.env;
const sequelize = new Sequelize(NAME_DB, LOGIN_DB, PASSWORD_DB, {
  dialect: 'mysql',
  host: 'localhost',
});

const CommentModel = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Comments',
  },
);

module.exports = { sequelize, CommentModel };
