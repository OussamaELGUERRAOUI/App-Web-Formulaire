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


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));


// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const formData = req.body;
    const universityId = formData.univ.selectedEcole.id; // Assuming university ID is sent from the form    
    console.log(formData);

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
                        response: question.response
                    });
                }
            }
        });
    });

    // Save updated data back to blocs.json
   /* fs.writeFile(blocsFilePath, JSON.stringify(blocsData, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });*/
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
