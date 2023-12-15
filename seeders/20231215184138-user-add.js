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
    await queryInterface.bulkInsert('users', [
       {
         name: 'Ram Singh',
         email: 'ram12@xyz.com'
       },
       {
        name: 'Mohan Singh',
        email: 'mohan100@xyz.com'
      },      
      {
        name: 'Mahesh Kumar',
        email: 'mahesh14@xyz.com'
      },
      {
        name: 'Bhupesh Yadav',
        email: 'bhupeshji123@xyz.com'
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
