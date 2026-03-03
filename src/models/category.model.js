// src/models/category.model.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, { sequelize, modelName: 'category' });

module.exports = Category;