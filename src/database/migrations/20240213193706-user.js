"use strict";

const { INTEGER, JSON } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      registration: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mother_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      occurrence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      access_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      last_modified_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      department: {
        type: Sequelize.ARRAY(INTEGER),
        allowNull: false,
      },
      name_main_department: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      access_level: {
        type: Sequelize.ARRAY(JSON),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
