'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AnswerRatings', [{
      user: 1,
      answer: 1,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 1,
      answer: 2,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 1,
      answer: 3,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 1,
      answer: 4,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 2,
      answer: 3,
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 2,
      answer: 5,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user: 3,
      answer: 1,
      isLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AnswerRatings', null, {});
  }
};
