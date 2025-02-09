CREATE TABLE reponses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_question INT,
    id_etudiant INT,
    id_universite INT,
    reponse TEXT,
    FOREIGN KEY (id_etudiant) REFERENCES etudiant(id)
);