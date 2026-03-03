const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation simple des champs
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email et mot de passe sont requis" 
      });
    }

    // Appel du service
    const result = await authService.login(email, password);

    // Réponse au frontend
    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: result // Contient { user, token }
    });

  } catch (error) {
    // En cas d'erreur (user non trouvé ou mauvais mdp)
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

//Le controller appelle le service et gère la réponse HTTP (200 si succès, 401 si erreur).