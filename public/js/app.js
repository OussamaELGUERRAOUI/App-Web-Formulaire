var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    // Exemple de données
    $scope.data = {
        "bloc": [],
        "payslist": [
            {
                "university": [
                    {"specialite": ["Erasmus", "Free Mover"], "name": "vdf"},
                    {"specialite": ["Erasmus", "Free Mover", "Accord Fitec"], "name": "vdfed", "cadre" : ["a","b"]}
                ],
                "name": "france"
            },
            {
                "university": [
                    {"specialite": ["Erasmus", "Free Mover", "Accord Fitec", "Master", "Double Diplome"], "name": "dff", "cadre" : ["a","b"]}
                ],
                "name": "espagne"
            }
        ]
    };

    $scope.selectedCountry = null;
    $scope.selectedUniversity = null;
   


    $scope.getUniversities = function() {
        if ($scope.selectedCountry) {
            return $scope.selectedCountry.university;
        } else {
            return [];
        }
    };

    $scope.getSpecialties = function() {
        if ($scope.selectedUniversity) {
            return $scope.selectedUniversity.specialite;
        } else {
            return [];
        }
    };

    $scope.getCadres = function() {
        if ($scope.selectedUniversity) {
            return $scope.selectedUniversity.cadre;
        } else {
            return [];
        }
    };
});
