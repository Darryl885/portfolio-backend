// src/models/index.js
const sequelize = require('../config/database');
const Project = require('./project.model');
const Category = require('./category.model');
const Technology = require('./technology.model');
const User = require('./user.model');

// --- DÉFINITION DES RELATIONS ---

// 1. Relation Projet <-> Catégorie
Project.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'SET NULL', // Si on supprime une catégorie, le projet reste mais n'a plus de catégorie
  onUpdate: 'CASCADE'
});

Category.hasMany(Project, {
  foreignKey: 'categoryId',
  as: 'projects'
});

// 2. Relation Projet <-> Technologie (Many-to-Many)
// On ajoute onDelete: 'CASCADE' pour que la table de liaison soit nettoyée automatiquement
Project.belongsToMany(Technology, { 
  through: 'ProjectTechnologies',
  as: 'technologies',
  foreignKey: 'projectId',
  otherKey: 'technologyId',
  onDelete: 'CASCADE' // Indispensable pour la suppression
});

Technology.belongsToMany(Project, { 
  through: 'ProjectTechnologies',
  as: 'projects',
  foreignKey: 'technologyId',
  otherKey: 'projectId',
  onDelete: 'CASCADE'
});

// On exporte tout
module.exports = {
  sequelize,
  Project,
  Category,
  Technology,
  User
};