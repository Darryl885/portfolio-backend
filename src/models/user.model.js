// src/models/user.model.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt'); 

class User extends Model {
  // Méthode pour vérifier le mot de passe lors de la connexion
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
      isEmail: true 
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // Hachage automatique lors de la création ou modification
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    }
  },
  // --- AJOUT DE LA COLONNE ROLE ---
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' // Par défaut, un utilisateur normal
  }
}, { 
  sequelize, 
  modelName: 'user',
  timestamps: true 
});

module.exports = User;