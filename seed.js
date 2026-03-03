require('dotenv').config();
const { User, sequelize } = require('./src/models');

async function createAdmin() {
  try {
    // 1. On force la synchronisation pour être sûr que la table existe
    await sequelize.sync();

    // 2. On vérifie si l'admin existe déjà
    const adminExists = await User.findOne({ where: { email: 'admin@portfolio.com' } });

    if (!adminExists) {
      // 3. On crée l'admin (le mot de passe sera haché par le modèle)
      await User.create({
        email: 'admin@portfolio.com',
        password: 'MonMotDePasseSecret123'
      });
      console.log(' Admin créé avec succès !');
    } else {
      console.log(' L\'admin existe déjà en base de données.');
    }
  } catch (error) {
    console.error(' Erreur lors du seeding :', error);
  } finally {
    process.exit();
  }
}

createAdmin();