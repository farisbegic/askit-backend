'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerRating extends Model {
    static associate(models) {
      AnswerRating.belongsTo(models.User, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
      AnswerRating.belongsTo(models.Answer, {
        foreignKey: "answer",
        onDelete: "CASCADE"
      })
    }
  }
  AnswerRating.init({
    user: DataTypes.INTEGER,
    answer: DataTypes.INTEGER,
    isLike: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AnswerRating',
  });
  return AnswerRating;
};