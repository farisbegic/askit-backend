'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.User, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
      Answer.belongsTo(models.Question, {
        foreignKey: "question",
        onDelete: "CASCADE"
      })
      Answer.hasMany(models.AnswerRating, {
        foreignKey: "answer",
        onDelete: "CASCADE"
      })
    }
  }
  Answer.init({
    description: DataTypes.STRING,
    question: DataTypes.INTEGER,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};