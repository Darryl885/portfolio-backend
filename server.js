// server.js
require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models'); // Importe l'index qui contient tout

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Test de la connexion
    await sequelize.authenticate();
    console.log(' Connexion à MySQL réussie.');

    // 2. Synchronisation des modèles
    // force: false -> Ne supprime pas les données existantes
    // alter: true  -> Met à jour les tables si tu modifies les modèles
    await sequelize.sync({ alter:true });
    console.log(' Modèles synchronisés avec la base de données.');

    // 3. Lancement du serveur
    app.listen(PORT, () => {
      console.log(` Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Impossible de démarrer le serveur:', error);
    process.exit(1); // Arrête le processus en cas d'échec critique
  }
}

startServer();