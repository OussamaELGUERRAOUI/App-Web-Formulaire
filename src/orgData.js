
function toNumber(value) {
  if (value =''){
    console.log('value is empty');
    return 0;
  }else{
    return +value;
  }
}




function getFicheEtudiant(jsonData) {
  return {
    nom: jsonData.nom,
    prenom: jsonData.prenom,
    email: jsonData.email,
    departement: jsonData.departement,
    semestre: jsonData.semestre,
    date_mobilite: jsonData.date_mobilite,
    durree_mobilite: jsonData.durree_mobilite,
    affichage : true
  }
}

function getFicheUniversite(jsonData) {
  return {
  cadre: jsonData.cadre,
  pays: jsonData.pays,
  ville: jsonData.ville, 
  universite: jsonData.universite,
  type_sejour: jsonData.type_sejour,
  stage_remunere: jsonData.stage_remunere,
  langue_enseignement: jsonData.langue_enseignement,
  residence_universitaire: jsonData.residence_universitaire,
  date_normale_rattrapage: jsonData.date_normale_rattrapage,
  moyenne: jsonData.moyenne,
  exigence_linguistique: jsonData.exigence_linguistique,
  affichage : true
  }
}

function getFicheSeour(jsonData) {
  return {
    satis_sejour: jsonData.satis_sejour,
    affichage : true
  }
}

function getFichePrepaSejour(jsonData) {
  return {
    aides: jsonData.aides,
  demarches_administratives: jsonData.demarches_administratives,
  recommendations: jsonData.recommendations,
  affichage : true
  }
}

function getArrive (jsonData) {
  return {
    demarches_ad_arri: jsonData.demarches_ad_arri,
  acceuil_aide: jsonData.acceuil_aide,
  difficulte: jsonData.difficulte,
  ressource_orrientation: jsonData.ressource_orrientation,
  affichage : true
  }
}

function getCoutVie (jsonData) {
  return {
  logement: toNumber(jsonData.logement),
  nourriture: toNumber(jsonData.nourriture),
  transport: toNumber (jsonData.transport),
  frais_scolarite: toNumber (jsonData.frais_scolarite),
  mutuelle : toNumber(jsonData.assurance),
  autres: toNumber (jsonData.autres),
  affichage : true
  }
}

function getAcademique (jsonData) {
  return {
    cours_desire: jsonData.cours_desire,
  cours_propose: jsonData.cours_propose,
  recommandation_choix: jsonData.recommandation_choix,
  connaissances_linguistique: jsonData.connaissances_linguistique,
  difference_enseeiht: jsonData.difference_enseeiht,
  charge_parrapport_enseeiht: jsonData.charge_parrapport_enseeiht,
  affichage : true
  }
}

function getLogement (jsonData) {
  return {
    demarche_recherche : jsonData.demarche_recherche,
    lrecommandation : jsonData.lrecommandation,
    affichage : true
  }
}

function getVieEtudiante (jsonData) {
  return {
  parascolaire: jsonData.parascolaire,
  culturelle: jsonData.culturelle,
  affichage : true
  }
}

function getConseil (jsonData) {
    return {
        conseil: jsonData.conseil,
        affichage : true
    }
    }



module.exports = {
  getFicheEtudiant,
  getFicheUniversite,
  getFicheSeour,
  getFichePrepaSejour,
  getArrive,
  getCoutVie,
  getAcademique,
  getVieEtudiante,
  getConseil,
  getLogement
};
