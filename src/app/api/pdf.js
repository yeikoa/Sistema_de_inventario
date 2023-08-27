const express = require('express');
const fs = require('fs');
const pdf = require('pdf-parse');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;

app.use(fileUpload());

app.post('./dashboard/registro/facturas', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const pdfFile = req.files.pdfFile;
  const dataBuffer = Buffer.from(pdfFile.data);

  pdf(dataBuffer).then(function(data) {
    res.send(data.text);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
