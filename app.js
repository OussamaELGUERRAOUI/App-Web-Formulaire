const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Import path module for handling file paths
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Path to your blocs.json file
const blocsFilePath = './data/blocs.json';

// Load the blocs.json file
let blocsData = require(blocsFilePath);
let etudiant = require('./data/etudiant.json');
let informationEcole = require('./data/informationEcole.json');
const e = require('express');

let idEtudiant = etudiant.length + 1;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));


// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const formData = req.body;
    const universityId = formData.university.selectedEcole.id; // Assuming university ID is sent from the form    
    //console.log(formData);
    
    // Add the student to the list of students
    let studentData = formData.student;
    studentData.idEtudiant = idEtudiant;
    etudiant.push(studentData);

    // Loop through each bloc and store the responses
    formData.blocs.forEach(bloc => {
        bloc.questions.forEach(question => {
            // Find the matching question in the blocsData and update its response
            let block = blocsData.find(b => b.idBlock === bloc.idBlock);
            if (block) {
                let questionData = block.questions.find(q => q.idQuestion === question.idQuestion);
                if (questionData) {
                    questionData.reponse.push({
                        universityId: universityId,
                        etudiantId: idEtudiant,
                        response: question.response
                    });
                }
            }
        });
    });

    let dataUniv = formData.university;

    blocsData.forEach(bloc => {
        bloc.questions.forEach(question => {
            switch (question.idQuestion) {
                case 1:
                    question.reponse.push({
                        universityId: universityId,
                        etudiantId: idEtudiant,
                        response: dataUniv.ville
                    })
                break;
                case 2:
                    question.reponse.push({
                        universityId: universityId,
                        etudiantId: idEtudiant,
                        response: dataUniv.typeSej
                    })
                break;
                case 3:
                    question.reponse.push({
                        universityId: universityId,
                        etudiantId: idEtudiant,
                        response:dataUniv.langue});  // Langue d'enseignement
                    break;
                case 4:
                    question.reponse.push({
                        universityId: universityId,
                        etudiantId: idEtudiant,
                        response : dataUniv.dateRatt});  // Dates approximatives
                    break;
                case 6:
                    question.reponse.push({
                        universityId: universityId,
                        etudiantId: idEtudiant,
                        response:dataUniv.langueEx});  // Exigences linguistiques
                    break;
                default:
                    // Pas d'information pour la question 5 (moyenne requise)
                    break;
                    
            }
        });
    });




    console.log(blocsData);

    // Save updated data back to blocs.json
    fs.writeFile(blocsFilePath, JSON.stringify(blocsData, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });

    // Save updated data back to etudiant.json
    fs.writeFile('./data/etudiant.json', JSON.stringify(etudiant, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });
});

let transformToList = (obj) => {
    var result = [];
    for (let key in obj) {
        // Si la valeur est un tableau, on prend la première valeur
        if (Array.isArray(obj[key])) {
            var object="";
            for(var i=0; i<obj[key].length; i++){
                object = object + obj[key][i] ;
                if(i<obj[key].length-1){
                    object = object + ", ";
                }
            }
            result.push({
                question: key,
                reponse: [object]  // On prend le premier élément du tableau
            });
        } else {
            result.push({
                question: key,
                reponse: [obj[key]]
            });
        }
    }
    return result;
};


app.get('/informationEtudiant', (req, res) => {
    const idUniversity = req.query.university;
    const selectedEcole = req.query.pays;

    var informationecole = informationEcole.find(function (element) {
        return element.country == selectedEcole;
    }).universities.find(function (element) {
        return element.id == idUniversity;
    }).information[0];

    //var transformToListInf = transformToList(informationecole);
    const transformToListInf = [];
    for (let key in informationecole) {
        // Si la valeur est un tableau, on prend la première valeur
        if (Array.isArray(informationecole[key])) {
            var object="";
            for(var i=0; i<informationecole[key].length; i++){
                object = object + informationecole[key][i] ;
                if(i<informationecole[key].length-1){
                    object = object + ", ";
                }
            }
            transformToListInf.push({
                question: key,
                reponse: [object]  // On prend le premier élément du tableau
            });
        } else {
            transformToListInf.push({
                question: key,
                reponse: [informationecole[key]]
            });
        }
    }



    var blockInf = blocsData[0];

    for(var i = 0; i < blockInf.questions.length; i++){
        var reponseTemp = [];
        if(blockInf.questions[i].reponse.length > 0){
            /*blockInf.questions[i].reponse = blockInf.questions[i].reponse.find(function (element) {
                return element.universityId == idUniversity;
            }).reponse;*/
            for(var j = 0; j < blockInf.questions[i].reponse.length; j++){
                if(blockInf.questions[i].reponse[j].universityId == idUniversity){
                    reponseTemp.push(blockInf.questions[i].reponse[j].response);
                }
            }
            blockInf.questions[i].reponse = reponseTemp;
        }
    }

    blockInf.questions = blockInf.questions.filter(obj => obj.hasOwnProperty("idQuestion"))

    console.log("1 : " + blockInf.questions); 

    blockInf.questions = blockInf.questions.concat(transformToListInf);
    
    console.log("2 : " + blockInf.questions);



    var blocs = blocsData.slice(1);

    for(var i = 0; i < blocs.length; i++){
        for(var j = 0; j < blocs[i].questions.length; j++){
            var reponseTemp = [];
            if(blocs[i].questions[j].reponse.length > 0){
                /*blocs[i].questions[j].reponse = blocs[i].questions[j].reponse.find(function (element) {
                    return element.universityId == idUniversity;
                });*/
                for(var k = 0; k < blocs[i].questions[j].reponse.length; k++){
                    if(blocs[i].questions[j].reponse[k].universityId == idUniversity){
                        reponseTemp.push(blocs[i].questions[j].reponse[k].response);
                    }
                }
                blocs[i].questions[j].reponse = reponseTemp;
            }
        }
    }


    let data = [...[blockInf], ...blocs];
    res.send(data);
    

});

app.get('/informationEtudiante', (req, res) => {
    const idUniversity = req.query.university;
    const selectedEcole = req.query.pays;

    var informationecole = informationEcole.find(function (element) {
        return element.country == selectedEcole;
    }).universities.find(function (element) {
        return element.id == idUniversity;
    }).information[0];

    const transformToListInf = [];
    for (let key in informationecole) {
        // Si la valeur est un tableau, on prend la première valeur
        if (Array.isArray(informationecole[key])) {
            let object = "";
            for (var i = 0; i < informationecole[key].length; i++) {
                object += informationecole[key][i];
                if (i < informationecole[key].length - 1) {
                    object += ", ";
                }
            }
            transformToListInf.push({
                question: key,
                reponse: [object]  // On prend le premier élément du tableau
            });
        } else {
            transformToListInf.push({
                question: key,
                reponse: [informationecole[key]]
            });
        }
    }

    // Gestion de blockInf
    var blockInf = blocsData[0];

    // Réinitialiser les réponses de blockInf
    for (var i = 0; i < blockInf.questions.length; i++) {
        blockInf.questions[i].reponse = []; // Réinitialiser les réponses
    }

    // Remplir les réponses dans blockInf
    for (var i = 0; i < blockInf.questions.length; i++) {
        var reponseTemp = [];
        if (blockInf.questions[i].reponse.length > 0) {
            for (var j = 0; j < blockInf.questions[i].reponse.length; j++) {
                if (blockInf.questions[i].reponse[j].universityId === idUniversity) {
                    reponseTemp.push(blockInf.questions[i].reponse[j].response);
                }
            }
            blockInf.questions[i].reponse = reponseTemp;
        }
    }

    // Ajouter les nouvelles réponses
    blockInf.questions = blockInf.questions.concat(transformToListInf);

    // Gestion des autres blocs
    var blocs = blocsData.slice(1);
    for (var i = 0; i < blocs.length; i++) {
        for (var j = 0; j < blocs[i].questions.length; j++) {
            var reponseTemp = [];
            if (blocs[i].questions[j].reponse.length > 0) {
                for (var k = 0; k < blocs[i].questions[j].reponse.length; k++) {
                    if (blocs[i].questions[j].reponse[k].universityId === idUniversity) {
                        reponseTemp.push(blocs[i].questions[j].reponse[k].response);
                    }
                }
                blocs[i].questions[j].reponse = reponseTemp;
            }
        }
    }

    // Envoyer les données
    let data = [...[blockInf], ...blocs];
    res.send(data);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
