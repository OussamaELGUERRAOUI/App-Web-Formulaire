const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

async function generatePDF(formData) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const formattedData = `Nom: ${formData.name}\nPrénom: ${formData.firstname}\nDépartement: ${formData.departement}\nPays: ${formData.pays}\nUniversité: ${formData.university}\nFilière: ${formData.filiere}\nSemestre: ${formData.semestre}\nCadre: ${formData.cadre}\nEmail: ${formData.email}\nMessage: ${formData.message}`;

    page.drawText(formattedData, {
        x: 50,
        y: 700,
        size: 12,
        color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('formData.pdf', pdfBytes);
}

module.exports = {
    generatePDF
};
