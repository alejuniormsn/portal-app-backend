"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("camera_review", {
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
      car: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_camera: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_occurrence: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      reviewed_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_review: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      there_video: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      video_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      driver_registration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ra_globus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("camera_review");
  },
};
