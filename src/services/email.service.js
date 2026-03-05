const nodemailer = require('nodemailer');

// Création du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,              // smtp.gmail.com pour Gmail
  port: Number(process.env.EMAIL_PORT),      // 587 (TLS)
  secure: true,                             // false pour TLS sur 587
  auth: {
    user: process.env.EMAIL_USER,            // ton email Gmail
    pass: process.env.EMAIL_PASS             // mot de passe d'application Gmail
  },
  tls: {
    rejectUnauthorized: false                // Ignorer certificat auto-signé (utile en dev)
  }
});

/**
 * Envoie un email de contact
 * @param {string} name - Nom de l'expéditeur
 * @param {string} email - Email de l'expéditeur
 * @param {string} message - Contenu du message
 */
exports.sendContactEmail = async (name, email, message) => {
  const mailOptions = {
    from: `"${name}" <${email}>`,            // expéditeur
    to: process.env.ADMIN_EMAIL,             // email qui reçoit les messages
    subject: "📩 Nouveau message de ton Portfolio",
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      </div>
    `
  };

  // Envoi de l'email
  return transporter.sendMail(mailOptions);
};