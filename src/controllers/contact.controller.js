const emailService = require('../services/email.service');

exports.sendMail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // 1. Validation : On vérifie que les données sont présentes
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Tous les champs (nom, email, message) sont requis." 
      });
    }

    // 2. Appel au service Resend (que nous avons configuré juste avant)
    await emailService.sendContactEmail(name, email, message);
    
    // 3. Réponse de succès (J'ai modifié le message pour "Resend")
    res.json({ 
      success: true, 
      message: "Ton message a bien été envoyé ! Je te répondrai rapidement." 
    });

  } catch (error) {
    // Si Resend renvoie une erreur (clé API invalide, etc.), elle arrive ici
    console.error("Erreur Contrôleur Email:", error);
    
    res.status(500).json({
      success: false,
      message: "Désolé, l'envoi du message a échoué. Réessaie plus tard."
    });
  }
};