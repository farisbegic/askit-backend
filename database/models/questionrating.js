'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionRating extends Model {

    static associate(models) {
      QuestionRating.belongsTo(models.User, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
      QuestionRating.belongsTo(models.Question, {
        foreignKey: "question",
        onDelete: "CASCADE"
      })
    }
  }
  QuestionRating.init({
    user: DataTypes.INTEGER,
    question: DataTypes.INTEGER,
    isLike: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuestionRating',
  });
  return QuestionRating;
};