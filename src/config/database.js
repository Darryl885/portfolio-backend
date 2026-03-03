// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Évite de polluer la console avec du SQL brut
    define: {
      timestamps: true, // Génère automatiquement createdAt et updatedAt
      underscored: true // Utilise snake_case en DB (ex: created_at)
    } , 
    // 🛡️ CONFIGURATION SÉCURISÉE POUR LA PROD
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Permet de se connecter à des services comme Aiven/Railway sans certificat local
      }
    }
  }
);

module.exports = sequelize;