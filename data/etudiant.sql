CREATE TABLE etudiant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(50),
    semestre VARCHAR(50),
    departement VARCHAR(50),
    date_mobilite DATE,
    duree_mobilite INT,
    id_universite INT
);