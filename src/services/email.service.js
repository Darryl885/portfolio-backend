const { Resend } = require('resend');

// On utilise l'API de Resend au lieu de Nodemailer pour passer outre les blocages de Render
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envoie un email de contact via l'API Resend
 * @param {string} name - Nom de l'expéditeur
 * @param {string} email - Email de l'expéditeur (le visiteur)
 * @param {string} message - Contenu du message
 */
exports.sendContactEmail = async (name, email, message) => {
  try {
    const data = await resend.emails.send({
      // IMPORTANT: En mode test, Resend impose cet expéditeur
      from: 'Portfolio <onboarding@resend.dev>', 
      // C'est ton adresse email qui recevra le message (configurée sur Render)
      to: [process.env.ADMIN_EMAIL],
      // Permet de répondre directement au visiteur en cliquant sur "Répondre"
      reply_to: email, 
      subject: `📩 Nouveau message de ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p><strong>Message :</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
            ${message}
          </div>
          <footer style="margin-top: 20px; font-size: 12px; color: #888;">
            Envoyé depuis ton formulaire de Portfolio.
          </footer>
        </div>
      `
    });

    console.log(" Email envoyé avec succès, ID:", data.id);
    return data;
  } catch (error) {
    console.error(" Erreur lors de l'envoi avec Resend:", error);
    throw error; // On renvoie l'erreur pour que ton contrôleur puisse envoyer une réponse 500 propre
  }
};