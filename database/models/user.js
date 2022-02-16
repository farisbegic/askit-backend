'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // User can submit many questions
      User.hasMany(models.Question, {
        foreignKey: "user",
        onDelete: "CASCADE"
      });
      // User can answer many answers
      User.hasMany(models.Answer, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
      // User can rate many answers
      User.hasMany(models.AnswerRating, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
      // User can rate many questions
      User.hasMany(models.QuestionRating, {
        foreignKey: "user",
        onDelete: "CASCADE"
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};