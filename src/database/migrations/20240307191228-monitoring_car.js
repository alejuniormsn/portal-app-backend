"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("monitoring_car", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      monitor_registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_check: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      car: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      driver_registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_occurrence: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ra_globus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      video_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      treatment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_inspector: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      inspector_registration: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable("monitoring_car");
  },
};
