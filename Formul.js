     
    const paysSelect = document.getElementById('pays');
    const universitySelect = document.getElementById('university');

    const universitiesByCountry = {
        royaumeUni: ["Cranfield University",  " Cranfield University " ,  " Manchester Metropolitan University " ,  " Coventry University " ,  " Imperial College London " ,  " University of Birmingham " ,  " The University of Manchester " ],
        canada: ["École Polytechnique de Montréal",  " Faculté Agronomie - Université Laval, Faculté des sciences et génie - Université Laval, Université Laval " ,  " École de Technologie Supérieure (ETS) " ,  " University of Sherbrooke " ,  " University of Sherbrooke " ,  " University of Sherbrooke " ,  " University of Sherbrooke " ,  " Université du Québec à Chicoutimi " ,  " Université du Québec à Chicoutimi " ,  " Université du Québec à Chicoutimi " ,  " Université du Québec à Chicoutimi " ,  " Université du Québec à Chicoutimi " ,  " Faculté Agronomie - Université Laval, Faculté des sciences et génie - Université Laval, Université Laval " ,  " Université du Québec à Montréal " ,  " University of Sherbrooke " ,  " École Polytechnique de Montréal " ,  " École de Technologie Supérieure (ETS) " ,  " Université du Québec à Chicoutimi " ,  " Faculté Agronomie - Université Laval, Faculté des sciences et génie - Université Laval, Université Laval " ,  " Université du Québec à Trois-Rivières " ],
        tunisie: ["Ecole Nationale d'Ingenieur de Tunis",  " Institut National des Sciences Appliquées et de Technologie, Université de Carthage " ,  " Institut National des Sciences Appliquées et de Technologie, Université de Carthage " ],
        maroc: ["Ecole Nationale Supérieure d'Arts et Métiers (Mohammed V Rabat), Université Mohammed V Rabat",  " Ecole Hassania des Travaux Publics " ],
        espagne: ["Universidad Politécnica de Madrid",  " Mondragon Unibertsitatea " ,  " Universidad Complutense de Madrid " ,  " Universidad de Deusto " ,  " Mondragon Unibertsitatea " ,  " Mondragon Unibertsitatea " ,  " Universidad Politécnica de Madrid " ,  " Universidad Politécnica de Madrid " ,  " Universidad Politécnica de Madrid " ,  " Universidad Politécnica de Madrid " ,  " Universitat Politècnica de València " ,  " Universidad Pública de Navarra " ,  " Universidad Miguel Hernandez de Elche " ,  " Universidad de Sevilla " ,  " Universitat de València " ,  " Universidad de Valladolid " ,  " Universidad de Vigo " ,  " Universidad de Zaragoza " ,  " Universidad de Zaragoza " ,  " Universidad de Zaragoza " ,  " Universidad del País Vasco / Euskal Herriko Unibertsitatea " ,  " Universidade da Coruña " ,  " Universitat Politècnica de Catalunya " ],
        argentine: ["Departamento de Ingeniería Eléctrica y de Computadoras, Universidad Nacional del Sur",  " Facultad de Agronomia de la Universidad de Buenos Aires, Facultad de Ingeniería de la Universidad de Buenos Aires, Universidad de Buenos Aires " ,  " Facultad de Ciencias Exactas, Físicas y Naturales (FCEFyN), Universidad Nacional de Córdoba " ,  " Universidad Nacional de Rosario " ],
        colombie: ["Escuela Colombiana de Ingeniería Julio Garavito",  " Pontificia Universidad Javeriana " ,  " Universidad de Los Andes " ,  " Universidad Nacional de Colombia " ,  " Universidad Antonio Nariño " ],
        cameroun: ["Ecole Nationale Supérieure Polytechnique (Univ. Yaoundé I), Université de Yaoundé I"],
        cambodge: ["Institut de Technologie du Cambodge",  " Ministry of Water Resources and Meteorology " ,  " National Institute of Posts, Telecoms & ICT " ],
        brésil: ["Universidade Federal de Santa Catarina (UFSC)",  " Universidade Federal de Santa Catarina (UFSC) " ,  " Universidade Federal do Rio Grande do Norte " ,  " Universidade Federal do Rio de Janeiro (UFRJ) " ,  " Universidade Federal de Santa Catarina (UFSC) " ,  " Universidade Estadual Paulista 'Júlio de Mesquita Filho' (UNESP) " ],
        vietNam: ["Institut Polytechnique de Ho Chi Minh Ville",  " University of Science and Technology of Hanoi " ,  " Institut Polytechnique de Ho Chi Minh Ville " ],
        suisse: ["BFH Berner Fachhochschule",  " BFH Berner Fachhochschule " ,  " FHNW Fachhochschule Nordwestschweiz " ,  " FHNW Fachhochschule Nordwestschweiz " ,  " Université de Neuchâtel " ,  " École Polytechnique Fédérale (EPF) Lausanne " ],
        chine: ["Huazhong University of Science and Technology",  " Sichuan University " ],
        japon: ["Kobe University",  " Kyoto University of Advanced Science " ,  " Okayama University " ,  " Tohoku University " ,  " Tokyo City University " ,  " Kyoto University of Advanced Science " ,  " National Institute of Informatics " ],
        taiwan: ["National Cheng Kung University",  " National Tsing Hua University " ,  " National Taiwan University " ],
        dominicaineRépublique: ["Universidad APEC"],
        equateur: ["Universidad de Cuenca",  " Universidad Politécnica Salesiana " ,  " Escuela Politécnica Nacional " ],
        liban: ["Université Saint-Joseph"],
        australie: ["University of Sydney"],
        allemagne: ["Rheinisch-Westfälische Technische Hochschule Aachen",  " Hochschule Bremen " ,  " Technische Universität Berlin " ,  " Technische Universität Berlin " ,  " Technische Universität Berlin " ,  " Technische Universität Clausthal " ,  " Technische Universität Darmstadt " ,  " Technische Universität Hamburg-Harburg " ,  " Technische Universität München (TUM) " ,  " Technische Universität München (TUM) " ,  " Universität Bremen " ],
        irlande: ["Dublin City University",  " Dublin City University " ,  " University College Cork " ],
        autriche: ["Alpen-Adria-Universität Klagenfurt"],
        belgique: ["KU Leuven",  " Hogeschool PXL " ,  " Université Libre de Bruxelles " ,  " Université de Liège " ,  " Université de Mons " ],
        italie: ["Università degli Studi di Napoli Federico II",  " Università degli Studi di Napoli Federico II " ,  " Università degli Studi di Napoli Federico II " ,  " Università degli Studi di Napoli Federico II " ,  " Università degli Studi di Napoli Federico II " ,  " Università degli Studi di Napoli Federico II " ,  " Politecnico di Milano " ,  " Politecnico di Milano " ,  " Politecnico di Torino " ,  " Università degli studi di Cassino e del Lazio Meridionale " ,  " Università degli Studi di Firenze " ,  " Università degli Studi della Campania Luigi Vanvitelli " ,  " Università degli Studi di Padova " ,  " Università degli Studi di Pavia " ,  " Università degli Studi di Roma 'Tor Vergata' " ,  " Università degli Studi di Bologna 'Alma Mater Studiorum' " ,  " Università degli Studi di Roma 'La Sapienza' " ,  " Università degli Studi di Firenze " ],
        pologne: ["Warsaw University of Technology",  " Warsaw University of Technology " ],
        suède: ["Uppsala universitet",  " Chalmers tekniska högskola " ],
        norvège: ["UiT Norges arktiske universitet",  " UiT Norges arktiske universitet " ],
        grece: ["University of West Attica (ex-TEI Piraeus)"],
        etatsUnis: ["Louisiana State University (LSU)",  " Michigan State University " ],
        paysBas: ["Technische Universiteit Delft"],
        thailande: ["Chulalongkorn University",  " King Mongkut's Institute of Technology Ladkrabang " ],
        inde: ["Indian Institute of Technology Bombay (IIT Bombay)",  " Indian Institute of Technology Indore " ],
        indonesie: ["Institut Teknologi Bandung",  " Institut Pertanian Bogor - Bogor Agricultural University " ,  " Universitas Brawijaya " ],
        coréeRepublique : ["Korea University of Technology and Education"],
        ghana: ["Takoradi Technical University"],
        mexique: ["Universidad Autónoma de Guadalajara"],
        malaisie: ["Universiti Malaya (UM)"],
        serbie: ["University of Belgrade"],
        france: ["EURECOM",  " Telecom Paris " ,  " Master X-HEC " ,  " ENSAE " ,  " ENSTA " ,  " INSTN Génie atomique " ,  " Master M-TECH-AMASONE de l'Ecole Centrale Nantes " ,  " Master Marine Sciences Parcours Physique océan et climat coaccréditée par l’IUEM à l’UBO et par l’ENSTA Bretagne " ,  " ENAC " ,  " IMT Mines Albi - filière ETN (Energie et Transition Numérique) " ,  " Master M2 Physique des Plasmas, Université Paris-Saclay (Paris-Sud) " ,  " ISAE " ,  " INSTN " ,  " SciencesPo Paris " ,  " TSM " ,  " TBS " ,  " IFP " ],
        russie: ["Tomsk Polytechnic University",  " Saint Petersburg State Institute of Technology " ,  " Siberian State Aerospace University" ]
        
    };
    
    // Définir les options d'université en fonction du pays sélectionné
    paysSelect.addEventListener('change', () => {
        const pays = paysSelect.value;
        universitySelect.innerHTML = '                        '; // Réinitialiser les options
        
        // Ajouter les options d'université en fonction du pays sélectionné
        universitiesByCountry[pays].forEach(universityName => {
            const option = document.createElement('option');
            option.textContent = universityName;
            universitySelect.appendChild(option);
        });
    });