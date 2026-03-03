const emailService = require('../services/email.service');

exports.sendMail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validation simple
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    await emailService.sendContactEmail(name, email, message);
    
    res.json({ success: true, message: "Message envoyé avec succès vers Mailtrap !" });
  } catch (error) {
    next(error);
  }
};