const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async login(email, password) {
    // 1. Chercher l'utilisateur par son email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // 2. Comparer le mot de passe fourni avec le hash en DB
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // 3. Si tout est OK, on génère un Token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userJson = user.toJSON();
    delete userJson.password;

    return { user: userJson, token };
  }

  // --- AJOUT DE LA MÉTHODE D'INITIALISATION ---
  async initialiserAdmin() {
    // 1. Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      throw new Error("L'administrateur a déjà été créé.");
    }

    // 2. Hacher le mot de passe manuellement pour le premier admin
    // Remplace 'ton_mot_de_passe_secret' par celui que tu veux utiliser
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('MonMotDePasseSecret123', salt);

    // 3. Créer l'utilisateur dans la base de données
    const newAdmin = await User.create({
      email: 'admin@portfolio.com', // Change cet email
      password: hashedPassword,
      role: 'admin'
    });

    const adminJson = newAdmin.toJSON();
    delete adminJson.password;

    return adminJson;
  }
}

module.exports = new AuthService();