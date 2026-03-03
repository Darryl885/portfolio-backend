// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'Documentation interactive de l\'API de mon Portfolio. Cette API gère les projets, les catégories, l\'authentification et le formulaire de contact.',
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Chemin vers les fichiers contenant les annotations Swagger
  apis: ['./src/routes/*.js', './src/models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;