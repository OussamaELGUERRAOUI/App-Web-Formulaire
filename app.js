const express = require('express');
const mysql = require('mysql'); // Assurez-vous d'avoir installé le module mysql

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'ri',
  password: 'Oussama',
  database: 'ri'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const formData = req.body;

  const sql = 'INSERT INTO nom_de_votre_table (name, firstname, departement, pays, university, filiere, semestre, cadre, email, message, pub) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [formData.name, formData.firstname, formData.departement, formData.pays, formData.university, formData.filiere, formData.semestre, formData.cadre, formData.email, formData.message, 0];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données :', err);
      res.send('Erreur lors de la soumission du formulaire');
      return;
    }
    console.log('Données insérées avec succès dans la base de données');
    res.send('Formulaire soumis avec succès !');
  });
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
