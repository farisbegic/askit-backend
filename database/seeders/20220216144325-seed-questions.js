'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Questions", [
      {
        description: "Kako popraviti laptop?",
        user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kako napraviti prozore?",
        user: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kako dizajnirati kucu?",
        user: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kako napraviti kolac?",
        user: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kako napraviti redux store?",
        user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kako se zaposliti u MoPu?",
        user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kako nauciti programirati?",
        user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Kada poceti trenirati?",
        user: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Questions", null, {});
  }
};
