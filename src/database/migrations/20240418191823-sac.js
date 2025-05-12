"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sac", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ticket_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      monitor_registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name_cli: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      history: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rg_cli: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      employee_involved: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      proceeding: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      video_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      related_ticket_list: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sac_group: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      car: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      line_bus: {
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
      date_occurrence: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sac");
  },
};
