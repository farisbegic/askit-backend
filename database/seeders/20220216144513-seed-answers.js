'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Answers', [{
      description: 'Izvadi SSD',
      question: 1,
      user: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Kupis prozore i postavis ih',
      question: 2,
      user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Zovni arhitektu',
      question: 3,
      user: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Potrazi recepte na internetu',
      question: 4,
      user: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Pogledaj tutorijal na redux oficijelnoj stranici',
      question: 4,
      user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
