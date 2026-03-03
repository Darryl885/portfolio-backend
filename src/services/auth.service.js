const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async login(email, password) {
    // 1. Chercher l'utilisateur par son email
    // On ne filtre pas le password ici car il est haché en DB
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // 2. Comparer le mot de passe fourni avec le hash en DB
    // On utilise la méthode de l'instance du modèle ou bcrypt directement
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // 3. Si tout est OK, on génère un Token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Le token expire après 1 jour
    );

    // On retourne l'utilisateur (sans le password) et le token
    const userJson = user.toJSON();
    delete userJson.password;

    return { user: userJson, token };
  }
}

module.exports = new AuthService();

//C'est ici que réside l'intelligence. On utilise
//  bcrypt pour comparer le mot de passe envoyé par Angular avec celui haché en base de données MySQL.