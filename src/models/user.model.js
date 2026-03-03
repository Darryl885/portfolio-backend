// src/models/user.model.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt'); // Pense à faire : npm install bcrypt

class User extends Model {
  // Méthode personnalisée pour vérifier le mot de passe lors de la connexion
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Validation native Sequelize
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // Sécurité : Ne jamais renvoyer le mot de passe lors d'un SELECT par défaut
    set(value) {
      // On hache le mot de passe avant de l'enregistrer en DB
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    }
  }
}, { 
  sequelize, 
  modelName: 'user',
  timestamps: true 
});

module.exports = User;