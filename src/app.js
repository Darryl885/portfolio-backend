const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const helmet = require('helmet');
const morgan = require('morgan');

// Import des routes
const projectRoutes = require('./routes/project.routes');
const categoryRoutes = require('./routes/category.routes');
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

// --- 1. MIDDLEWARES DE SÉCURITÉ ET CONFIGURATION ---

app.use(helmet());

app.use(cors({
  origin: ['https://portfolio-frontend-ochre-one.vercel.app'], // Autorise les deux variantes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ajoute OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true 
}));

app.use(morgan('dev'));

// IMPORTANT : Ces deux-là doivent être AVANT les routes pour lire le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- 2. DÉFINITION DES ROUTES ---

// ROUTE TEMPORAIRE DE SECOURS - À SUPPRIMER APRÈS USAGE
app.get('/api/initialiser-mon-admin', async (req, res) => {
  try {
    // Utilise le hash de ton mot de passe local (celui qui commence par $2b$)
    const hashLocal = '$2b$10$aH0rQWd8AjpAZTsQm/tnkuZWDxQlETuaUjjSJF6/iLt...'; 
    const email = 'admin@portfolio.com';

    // On insère directement dans la base Aiven via ton objet de connexion db
    // Vérifie bien que ta table s'appelle 'users' et tes colonnes 'email'/'password'
    const [result] = await db.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)', 
      [email, hashLocal]
    );

    res.send(' Admin créé avec succès dans Aiven !');
  } catch (err) {
    res.status(500).send(' Erreur : ' + err.message);
  }
});

// Route de base
app.get('/', (req, res) => {
  res.json({ message: "Bienvenue sur l'API de mon Portfolio !" });
});

// Route de test direct (pour vérifier que le serveur répond bien en POST)
app.post('/api/test-check', (req, res) => {
    res.json({ success: true, message: "Le serveur reçoit bien les requêtes POST !" });
});

// Branchement des ressources
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes); // Ta route de contact est ici

// app.post('/api/contact', (req, res) => {
//   res.json({ direct: true });
// });
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);


// --- 3. GESTION DES ERREURS (TOUJOURS EN DERNIER) ---

// Middleware pour capturer les routes inexistantes (404)
// Si aucune route ci-dessus n'a matché, on arrive ici
app.use((req, res, next) => {
  const error = new Error('Ressource non trouvée');
  error.status = 404;
  next(error);
});

// Middleware Global de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Une erreur interne est survenue sur le serveur",
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

module.exports = app;