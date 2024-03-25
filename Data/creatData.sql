DROP SCHEMA IF EXISTS RI;
CREATE SCHEMA RI;
USE RI;



CREATE TABLE etudiant(
    id_etudiant INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(60) NOT NULL,
    departement VARCHAR(50) NOT NULL, 
    semestre VARCHAR(50) NOT NULL,
    date_mobilite VARCHAR(50) NOT NULL,
    durree_mobilite VARCHAR(50) NOT NULL,
    affichage BOOLEAN NOT NULL
    );



CREATE TABLE universite(
    id_universite INT PRIMARY KEY AUTO_INCREMENT,
    universite VARCHAR(50) ,
    pays VARCHAR(50) ,
    ville VARCHAR(50) ,
    type_sejour VARCHAR(100) ,
    cadre VARCHAR(50) ,
    stage_remunere VARCHAR(50) ,
    langue_enseignement VARCHAR(50) ,
    residence_universitaire VARCHAR(50) ,
    date_normale_rattrapage VARCHAR(60) ,
    moyenne VARCHAR(50) ,
    exigence_linguistique TEXT,
    affichage BOOLEAN NOT NULL
);


CREATE TABLE sejour(
    id_sejour INT PRIMARY KEY AUTO_INCREMENT,
    satis_sejour TEXT NOT NULL,
    affichage BOOLEAN NOT NULL
);



CREATE TABLE preparation_sejour(
    id_preparation INT PRIMARY KEY AUTO_INCREMENT,
    aides TEXT NOT NULL,
    demarches_administratives TEXT NOT NULL,
    recommendations TEXT NOT NULL,
    affichage BOOLEAN NOT NULL
);



CREATE TABLE arrivee_universite(
    id_arrivee INT PRIMARY KEY AUTO_INCREMENT,
    demarches_ad_arri TEXT NOT NULL,
    acceuil_aide TEXT NOT NULL,
    difficulte TEXT NOT NULL,
    ressource_orrientation TEXT NOT NULL,
    affichage BOOLEAN NOT NULL
);



CREATE TABLE logement(
    id_logement INT PRIMARY KEY AUTO_INCREMENT,
    demarche_recherche TEXT NOT NULL,
    lrecommandation TEXT NOT NULL,
    affichage BOOLEAN NOT NULL
);



CREATE TABLE cout_vie(
    id_cout INT PRIMARY KEY AUTO_INCREMENT,
    logement INT NOT NULL,
    nourriture INT NOT NULL,
    transport INT NOT NULL,
    frais_scolarite INT NOT NULL,
    mutuelle INT NOT NULL,
    autres INT NOT NULL,
    affichage BOOLEAN NOT NULL
);



CREATE TABLE cours(
    id_cours INT PRIMARY KEY AUTO_INCREMENT,
    cours_desire TEXT NOT NULL,
    cours_propose TEXT NOT NULL,
    recommandation_choix TEXT NOT NULL,
    connaissances_linguistique TEXT NOT NULL,
    difference_enseeiht TEXT NOT NULL,
    charge_parrapport_enseeiht TEXT NOT NULL,
    affichage BOOLEAN NOT NULL
);



CREATE TABLE activite(
    id_activite INT PRIMARY KEY AUTO_INCREMENT,
    parascolaire TEXT NOT NULL,
    culturelle TEXT NOT NULL,
    affichage TEXT NOT NULL
);




CREATE TABLE conseil(
    id_conseil INT PRIMARY KEY AUTO_INCREMENT,
    conseil TEXT NOT NULL,
    affichage BOOLEAN NOT NULL
);


