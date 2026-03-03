// src/models/project.model.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Project extends Model {}

Project.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING
  },
  link_github: {
    type: DataTypes.STRING
  },
  link_demo: {
    type: DataTypes.STRING
  }
}, { sequelize, modelName: 'project' });

module.exports = Project;