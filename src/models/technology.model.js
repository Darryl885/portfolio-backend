// src/models/technology.model.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Technology extends Model {}

Technology.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, modelName: 'technology' });

module.exports = Technology;