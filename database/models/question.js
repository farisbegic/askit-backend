'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {

    static associate(models) {
      Question.belongsTo(models.User, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
      Question.hasMany(models.Answer, {
        foreignKey: "question",
        onDelete: "CASCADE"
      })
      Question.hasMany(models.QuestionRating, {
        foreignKey: "question",
        onDelete: "CASCADE"
      })
    }
  }
  Question.init({
    description: DataTypes.STRING,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};