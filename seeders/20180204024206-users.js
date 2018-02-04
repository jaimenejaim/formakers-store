'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('auth_users', [{
          first_name: 'ForMakers',
          last_name : 'Super',
          type : 'super',
          email : 'formakers-super@formakers-store.com.br',
          password : '﻿25d55ad283aa400af464c76d713c07ad'
      },{
          first_name: 'Nicolas',
          last_name : 'Tesla',
          email : 'nic@gmail.com',
          password : '﻿25d55ad283aa400af464c76d713c07ad'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
