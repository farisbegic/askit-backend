'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Faris',
      lastName: 'Begić',
      email: 'fabegic@gmail.com',
      password: '$2a$08$6/baXJbqVym5y.pi0wiMpOc2b9NNa.6tYAnFczath3cD7/d/PG7xe',
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Faruk',
      lastName: 'Burić',
      email: 'faburic@gmail.com',
      password: '$2a$08$6/baXJbqVym5y.pi0wiMpOc2b9NNa.6tYAnFczath3cD7/d/PG7xe',
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Adna',
      lastName: 'Salković',
      email: 'adsalkovic@gmail.com',
      password: '$2a$08$6/baXJbqVym5y.pi0wiMpOc2b9NNa.6tYAnFczath3cD7/d/PG7xe',
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Azra',
      lastName: 'Kurtic',
      email: 'azkurtic@gmail.com',
      password: '$2a$08$6/baXJbqVym5y.pi0wiMpOc2b9NNa.6tYAnFczath3cD7/d/PG7xe',
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Lejla',
      lastName: 'Vranac',
      email: 'levranac@gmail.com',
      password: '$2a$08$6/baXJbqVym5y.pi0wiMpOc2b9NNa.6tYAnFczath3cD7/d/PG7xe',
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
