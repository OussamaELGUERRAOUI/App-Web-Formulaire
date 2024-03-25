
function exist(school, listeSchool) {
    for (let i = 0; i < listeSchool.length; i++) {
        if (school === listeSchool[i]) {
            return true;
        }
    }
    return false;
}

function tostr(nbr){
    const str = '' + nbr;
    return str;
}

function indiceOfSchool(school, jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]['ecole'] === school) {
            return i;
        }
    }
    return -1;
}

function fusionerListe(liste, newListe) {
    for (let i = 0; i < newListe.length; i++) {
        if (!exist(newListe[i], liste)) {
            liste.push(newListe[i]);
        }
    }
    return liste;
}

function dataEcole(jsonData) {
    // Lire le fichier Excel
    //const workbook = XLSX.readFile(nomFichier);
   

    const newData = [];
    let schoolExistl = [];

    for (let i = 0; i < jsonData.length; i++) {
        let data = jsonData[i];
        let school = data['Etablissements externes'];
        const spe =tostr( data['Code du spécialité']);
        const speSplit = spe.split('-');
        


        if (!exist(school, schoolExistl)) {
            schoolExistl.push(school);
            newData.push({ 'ecole': school, 'Pays': data['Pays'], 'Cadres': [data['Cadres']], 'specialite': speSplit, 'Site': data['Lien du site internet de l\'école']});
        } else {
            const indice = indiceOfSchool(school, newData);
            console.log('l\'indice est :', indice);
            if (!exist(data['Cadres'], newData[indice].Cadres)) {
                newData[indice]['Cadres'].push(data['Cadres']);
            }
            newData[indice]['specialite'] = fusionerListe(newData[indice]['specialite'], speSplit); 
        }
    }


    return newData;
}


function listePays(data) {
  
    const listePays = [];
    for (let i = 0; i < data.length; i++) {
        if (!exist(data[i]['Pays'], listePays)) {
            listePays.push(data[i]['Pays']);
        }
    }
    return listePays;
}

function listEcole(pays, data) {

    const listeEcole = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i]['Pays'] === pays) {
            listeEcole.push(data[i]['ecole']);
        }
    }
    return listeEcole;
}

function listeSpecialite(ecole, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]['ecole'] === ecole) {
            return data[i]['specialite'];
        }
    }
    return [];
}

function listeCadres(ecole, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]['ecole'] === ecole) {
            return data[i]['Cadres'];
        }
    }
    return [];
}



module.exports ={
    dataEcole,
    listePays,
    listEcole,
    listeSpecialite,
    listeCadres
};




