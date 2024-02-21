
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { generatePDF } = require('./pdfCr');

// Configuration de body-parser pour récupérer les données POST
app.use(bodyParser.urlencoded({ extended: true }));

// Définition de la route pour le formulaire
app.post('/submit', (req, res) => {
    const formData = req.body; // Les données du formulaire sont disponibles dans req.body
    console.log('Données du formulaire:', formData);
    // Ici, vous pouvez traiter les données comme vous le souhaitez, les enregistrer dans une base de données, les utiliser pour envoyer un e-mail, etc.
    // Par exemple, pour envoyer une réponse au client :
    res.send('Formulaire soumis avec succès!');
    // Ou pour générer un PDF :
    generatePDF(formData).then(() => {
      console.log('Le PDF a été généré avec succès.');
      res.download('formData.pdf', 'formData.pdf', (error) => {
          if (error) {
              console.error('Erreur lors du téléchargement du PDF :', error);
          } else {
              console.log('PDF téléchargé avec succès.');
          }
      });
  }).catch(error => {
      console.error('Une erreur est survenue lors de la génération du PDF :', error);
      res.send('Erreur lors de la soumission du formulaire');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Lancement du serveur sur le port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
