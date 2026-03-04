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
    const email = 'admin@portfolio.com';
    const password = 'MonMotDePasseSecret123'; // PAS DE HASH ICI, le modèle s'en charge !

    const userExists = await User.findOne({ where: { email } });
    if (userExists) throw new Error("Cet utilisateur existe déjà.");

    const newAdmin = await User.create({
      email: email,
      password: password, // Sequelize va le hacher tout seul !
      role: 'admin'
    });

    return { id: newAdmin.id, email: newAdmin.email };
}
}

module.exports = new AuthService();