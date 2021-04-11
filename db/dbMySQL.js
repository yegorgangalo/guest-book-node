const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('try_db', 'root', 'My1-stDB', {
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
