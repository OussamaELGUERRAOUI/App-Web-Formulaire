import json

# Ouvrir le fichier JSON
with open('./data/blocs.json', encoding='utf-8') as f:  #
    data = json.load(f)

def videData_reponse():
    for block in data:
        for question in block["questions"]:
            question["reponse"] = []  # Remplacer les réponses par une liste vide

# Appeler la fonction pour vider les réponses
videData_reponse()

# Afficher les données modifiées
print(data)

# Enregistrer les données dans le fichier JSON
with open('./data/blocs.json', 'w', encoding='utf-8') as fichier:
    json.dump(data, fichier, indent=4, ensure_ascii=False)
