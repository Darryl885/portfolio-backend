#  Portfolio Backend API

Ceci est l'API REST de mon portfolio personnel, construite avec **Node.js**, **Express**, et **Sequelize**. Elle permet de gérer les projets, les catégories, et l'envoi de messages via un formulaire de contact.

##  Technologies utilisées

* **Node.js & Express** : Framework principal.
* **MySQL & Sequelize** : Base de données relationnelle et ORM.
* **Nodemailer** : Envoi d'emails (via Mailtrap en développement).
* **JWT (JSON Web Token)** : Authentification sécurisée des routes admin.
* **Helmet & CORS** : Sécurisation des en-têtes HTTP et gestion des accès.
* **Swagger (OpenAPI)** : Documentation interactive de l'API.

---

##  Prérequis

Avant de commencer, assurez-vous d'avoir installé :
* [Node.js](https://nodejs.org/) (v16+)
* [MySQL](https://www.mysql.com/)

---

##  Installation et Configuration

1. **Cloner le projet**
   ```bash
   git clone [https://github.com/ton-pseudo/portfolio-backend.git](https://github.com/ton-pseudo/portfolio-backend.git)
   cd portfolio-backend