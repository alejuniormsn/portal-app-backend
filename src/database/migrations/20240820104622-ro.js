"use strict";

/** @type {import('Sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ro", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      occurrence_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      monitor_registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vehicle_kilometer: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      employee_involved: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      occurrence_detail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      direction: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      collected: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      substitution: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      occurrence_response: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      deviation_realized: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      observation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date_restore: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      departure_canceled_go_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departure_canceled_go_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departure_canceled_return_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departure_canceled_return_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      interrupted_output: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      substitute_vehicle: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      occurrence_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("ro");
  },
};
