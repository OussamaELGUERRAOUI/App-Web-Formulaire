

async function affEcole(dataPays, dataEcole) {
    const paysSelec = document.getElementById('pays');
    const universitySelect = document.getElementById('university');

    dataPays.forEach(function (pays) {
        const option = document.createElement('option');
        option.textContent = pays;
        paysSelec.appendChild(option);
    });


    // Définir les options d'université en fonction du pays sélectionné
    paysSelect.addEventListener('change', () => {
        const pays = paysSelect.value;
        universitySelect.innerHTML = '                        '; // Réinitialiser les options
        // Ajouter les options d'université en fonction du pays sélectionné
        dataEcole.forEach(universityName => {
            const option = document.createElement('option');
            option.textContent = universityName;
            universitySelect.appendChild(option);
        });
    });

}




function getUniv(pays) {
    console.log('le pays est :', pays);
    fetch(`/pays/${pays}`)
        .then(response => {
            // Retourner la réponse JSON pour la chaîne de promesses suivante
            return response.json();
        })
        .then(data => {
            console.log(data);
            const universitySelect = document.getElementById('university');
            universitySelect.innerHTML = '                        '; // Réinitialiser les options
            const lUniv = data.univ;
            console.log('les universités sont :', lUniv); 
            lUniv.forEach(function (univ) {
                const option = document.createElement('option');
                option.textContent = univ;
                universitySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching response:', error));
}


document.getElementById('pays').addEventListener('change', function () {
    const pays = this.value;
    console.log('le pays est :', pays);
    getUniv(pays);
});

document.getElementById('pays').addEventListener('click', function () {
    fetch('/payschange')
        .then(response => {
            // Retourner la réponse JSON pour la chaîne de promesses suivante
            return response.json();
        })
        .then(data => {
            console.log(data);
            const paysSelec = document.getElementById('pays');
            const lPays = data.lPays;
            lPays.forEach(function (pays) {
                const option = document.createElement('option');
                option.textContent = pays;
                paysSelec.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching response:', error));
});

