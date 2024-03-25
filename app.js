
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getFicheEtudiant, getFicheUniversite, getFicheSeour, getFichePrepaSejour, getArrive, getAcademique, getVieEtudiante, getConseil, getCoutVie, getLogement} = require('./src/orgData.js');
const mysql = require('mysql2');
const XLSX = require('xlsx');
const {dataEcole, listePays, listEcole} = require('./src/donneeEcole.js');
//const { generatePDF } = require('./pdfCr');

// Configuration de body-parser pour récupérer les données POST
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('Data'));
app.use(express.static('src'));
app.use(express.static('style'));
app.use(express.static('web'));

// Configuration de EJS
app.set('view engine', 'ejs');
app.set('views', 'web');


// Configuration de la connexion à la base de données

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Oussama2001.',
    database: 'ri'
});

connection.connect((error) => {
    if (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
    } else {
        console.log('Connecté à la base de données.');
    }
}
);

//suprrimer le fichier pdf
function deletePDF(pdfPath) {
    fs.unlink(pdfPath, (error) => {
        if (error) {
            console.error('Erreur lors de la suppression du PDF :', error);
        } else {
            console.log('PDF supprimé avec succès.');
        }
    });
}


// recupération des données des pays et des écoles
const workbook = XLSX.readFile('Data/dd_ech_free-moveon.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(sheet);
const data = dataEcole(jsonData);
const lPays = listePays(data);


// Requêtes SQL pour insérer les données dans la base de données
const sqlEtudiant = 'INSERT INTO etudiant SET ?';
const sqlUniversite = 'INSERT INTO universite SET ?';
const sqlSejour = 'INSERT INTO sejour SET ?';
const sqlPrepaSejour = 'INSERT INTO preparation_sejour SET ?';
const sqlArrive = 'INSERT INTO arrivee_universite SET ?';
const sqlLogement = 'INSERT INTO logement SET ?';
const sqlAcademique = 'INSERT INTO cours SET ?';
const sqlVieEtudiante = 'INSERT INTO activite SET ?';
const sqlConseil = 'INSERT INTO conseil SET ?';
const sqlCoutVie = 'INSERT INTO cout_vie SET ?';

function insertData(sql, data,nameData) {
    connection.query(sql, data, (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'insertion des données :', error, nameData);
        } else {
            console.log('Données insérées avec succès. ', nameData);
        }
    });
}

// affichage des pays et des écoles
app.get('/pays/:paysId', (req, res) => {
    console.log('Accès à la page pays');
    const pays = req.params.paysId;
    if (pays){
        console.log('le pays est :', pays);
        const ecole = listEcole(pays, data);
        res.json({pays: pays, univ: ecole});
    }
    else {
        res.status(404).send('Pays non trouvé');
    }
   
  }
    );

  app.get('/payschange', (req, res) => {
    console.log('Accès à la page payschange');
    res.json({lPays : lPays});
  });

// Définition de la route pour le formulaire
app.post('/submit', (req, res) => {
    const formData = req.body; // Les données du formulaire 
    console.log(formData);
    const ficheEtudiant = getFicheEtudiant(formData);
    console.log(ficheEtudiant);
    insertData(sqlEtudiant, ficheEtudiant, 'etudiant');

    const ficheUniversite = getFicheUniversite(formData);
    console.log(ficheUniversite);
    insertData(sqlUniversite, ficheUniversite, 'universite');

    const ficheSeour = getFicheSeour(formData);
    console.log(ficheSeour);
    insertData(sqlSejour, ficheSeour, 'sejour');

    const fichePrepaSejour = getFichePrepaSejour(formData);
    console.log(fichePrepaSejour); 
    insertData(sqlPrepaSejour, fichePrepaSejour, 'prepa_sejour');

    const arrive = getArrive(formData);
    console.log(arrive);
    insertData(sqlArrive, arrive, 'arrive');

    const coutVie = getCoutVie(formData);
    console.log(coutVie);
    insertData(sqlCoutVie, coutVie, 'cout_vie');

    const logement = getLogement(formData);
    console.log(logement);
    insertData(sqlLogement, logement, 'logement');

    const academique = getAcademique(formData);
    console.log(academique);
    insertData(sqlAcademique, academique, 'academique')

    const vieEtudiante = getVieEtudiante(formData);
    console.log(vieEtudiante);
    insertData(sqlVieEtudiante, vieEtudiante, 'vie_etudiante');

    const conseil = getConseil(formData);
    console.log(conseil);
    insertData(sqlConseil, conseil, 'conseil');


    //console.log('Données du formulaire:', formData);
 
    // Par exemple, pour envoyer une réponse au client :
    res.send('Formulaire soumis avec succès!');
    // Ou pour générer un PDF :
    const pdfPath = 'form'+ formData.name +'.pdf';
   /* generatePDF(formData).then(() => {
      console.log('Le PDF a été généré avec succès.');
      res.download(pdfPath, pdfPath, (error) => {
          if (error) {
              console.error('Erreur lors du téléchargement du PDF :', error);
          } else {
              console.log('PDF téléchargé avec succès.');
              deletePDF(pdfPath);

          }
      });
  }).catch(error => {
      console.error('Une erreur est survenue lors de la génération du PDF :', error);
      res.send('Erreur lors de la soumission du formulaire');
  });*/  
});


app.get('/', (req, res) => {
    console.log('Accès à la racine du site');
    res.render('index', {lPays: lPays,
        selectedEcole: '',
        selectedPays: '',});
  });


// Lancement du serveur sur le port 3000
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
