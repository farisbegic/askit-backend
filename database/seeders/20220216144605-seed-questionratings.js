'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('QuestionRatings', [{
      user: 1,
      question: 1,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 2,
      question: 2,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 3,
      question: 3,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 1,
      question: 5,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 2,
      question: 3,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 2,
      question: 5,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 3,
      question: 1,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('QuestionRatings', null, {});
  }
};
