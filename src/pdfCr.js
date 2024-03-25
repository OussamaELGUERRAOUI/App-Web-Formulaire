const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');


function jsonToTable(json) {
    let table = [];
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            table.push([key, json[key]]);
        }
    }
    return table;
}

function verifyPage(y, text, coef, size){
     const textWidth = text.length*size;
     const nbLines = Math.ceil(textWidth/500);
    
    if (nbLines <= 1) {
        return y - 15;
    }else {
        return y - 15 - coef*nbLines;
    }
}



function verHaut (y, sizeText){
    if (y - sizeText < 50 ){
        return true;
    }else {
        return false;
    }

}




async function generatePDF(formData) {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    const formattedData = `Nom: ${formData.name}\nPrénom: ${formData.firstname}\nDépartement: ${formData.departement}\nPays: ${formData.pays}\nUniversité: ${formData.university}\nFilière: ${formData.filiere}\nSemestre: ${formData.semestre}\nCadre: ${formData.cadre}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const table = jsonToTable(formData);
    

    let nx = 50;
    let ny = 700;
    

    page.drawText('Les réponses du retour de mobilité', {
        size: 20,
        color: rgb(0.8, 0.2, 0.2),
        x: 200, 
        y: 740, 
    });
    
    for (let i = 0; i < 9; i++) {
        let text = table[i][0] + ': ' + table[i][1];
        page.drawText('-' + table[i][0] + ': ', {
            size: 12,
            color: rgb(0.2, 0.2, 0.2),
            lineHeight: 20,
            x: nx, 
            y: ny, 
        });
       

        page.drawText(table[i][1], {
            size: 10,
            color: rgb(0, 0, 0),
            lineHeight: 20,
            x: nx + (table[i][0] + ': ').length*6 + 20 , 
            y: ny });

        ny -= 22;
    }

    ny -= 10;

    page.drawText('Scolairité ', {
        size: 16,
        color: rgb(0.8, 0.2, 0.2),
        x: nx, 
        y: ny, 
    });

    ny -= 30;

    for (let i = 9; i < 17; i++) {

        if (verHaut(ny,50)){
            page = pdfDoc.addPage();
            ny = 800;
        }

        page.drawText('-' + table[i][0] + '.', {
            size: 12,
            color: rgb(0.3, 0.3, 0.3),
            maxWidth: 500,
            lineHeight: 15,
            x: nx, 
            y: ny, 
            transform: {bold: true}
        });
        //calculer la largeur du texte
        
        if (verHaut(ny,  (table[i][1].length/500)*8 + 10)){
            page = pdfDoc.addPage();
            ny = 800;
        }else {
            ny = verifyPage(ny, table[i][0], 8, 10);
        }
        //ny -= 8*nbLines + 10 ;
        //ny = extractY(pdfDoc) - 15;

        page.drawText(table[i][1], {
            size: 10,
            color: rgb(0, 0, 0),
            maxWidth: 500,
            lineHeight: 12,
            x: nx + 5, 
            y: ny, 
        });
        ny = verifyPage(ny, table[i][1], 8, 10);
        
        //ny = extractY(pdfDoc) - 25;
    }

    page.drawText('Coût de la vie: ', {
        size: 16,
        color: rgb(0.8, 0.2, 0.2),
        x: nx, 
        y: ny, 
    });
    ny -= 15;

    for (let i=17; i<23; i++){
        if (verHaut(ny, 50)){
            page = pdfDoc.addPage();
            ny = 800;
        }

        if (i==20){
            ny -= 17;
            nx = 50;
        }

        page.drawText('-' + table[i][0] + ':', {
            size: 12,
            color: rgb(0.3, 0.3, 0.3),
            maxWidth: 500,
            lineHeight: 15,
            x: nx, 
            y: ny, 
        });

        nx += 60;

        page.drawText(table[i][1], {
            size: 8,
            color: rgb(0, 0, 0),
            maxWidth: 500,
            lineHeight: 12,
            x: nx, 
            y: ny, 
        });

        nx += 70;
    }

    nx = 50;
    ny -= 30;
    page.drawText('La vie universétaire ', {   
        size: 16,
        color: rgb(0.8, 0.2, 0.2),
        x: nx,
        y: ny,
    });
    
    ny -= 18;

    for (let i=23; i<26; i++){
        if (verHaut(ny, 50)){
            page = pdfDoc.addPage();
            ny = 800;
        }

        page.drawText('-' + table[i][0] + ':', {
            size: 12,
            color: rgb(0.3, 0.3, 0.3),
            maxWidth: 500,
            lineHeight: 15,
            x: nx + 10, 
            y: ny, 
        });

        if (verHaut(ny , (table[i][1].length/500)*8 + 10)){
            page = pdfDoc.addPage();
            ny = 800;
        }else {
            ny = verifyPage(ny, table[i][0], 8, 10);
        }

        page.drawText(table[i][1], {
            size: 10,
            color: rgb(0, 0, 0),
            maxWidth: 500,
            lineHeight: 12,
            x: nx, 
            y: ny, 
        });
        ny = verifyPage(ny, table[i][1], 7, 9);
        
        
    }
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('form'+ formData.name +'.pdf', pdfBytes);

    //const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Création d'un lien de téléchargement et déclenchement du téléchargement
    //const link = document.createElement('a');
    //link.href = window.URL.createObjectURL(blob);
    //link.download = 'form'+ formData.name +'.pdf';
    //link.click();

    //console.log('PDF généré et téléchargé avec succès !');
}

module.exports = {
    generatePDF
};
