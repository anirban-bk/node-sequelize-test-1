'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('photos', [
      {
        url: 'photo url 7',
        user_id: 2
       },
       {
        url: 'photo url 8',
        user_id: 2
       },
       {
        url: 'photo url 9',
        user_id: 9
       },
       {
        url: 'photo url 10',
        user_id: 1
       },
       {
        url: 'photo url 11',
        user_id: 8
       },
       {
        url: 'photo url 12',
        user_id: 3
       }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
