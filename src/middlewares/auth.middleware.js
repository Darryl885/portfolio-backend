const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1. Récupérer le token du header (Format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Accès refusé. Aucun token fourni." 
      });
    }

    const token = authHeader.split(' ')[1];

    // 2. Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Ajouter les infos de l'utilisateur à l'objet 'req'
    // Cela permet aux contrôleurs suivants de savoir QUI fait la requête
    req.user = decoded;

    // 4. Passer au middleware/contrôleur suivant
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Token invalide ou expiré." 
    });
  }
};