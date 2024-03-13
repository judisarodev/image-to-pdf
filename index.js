const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const filepix = require("filepix");


const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());

const imagesPath = 'uploads/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagesPath) // Guarda los archivos en la carpeta 'uploads'
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) // Asigna un nombre único al archivo
    }
  });

  const upload = multer({ storage: storage });
  
  // Punto final POST para cargar archivos
  app.post('/image-to-pdf', upload.array('files'), (req, res) => {
    try{
        filepix.img2PDF(pages = './uploads', output = './pdf/file.pdf');
        const fileNames = req.files.map((file) => {
            return file.filename;
        });
        fileNames.forEach(file => {
            fs.unlinkSync('uploads/' + file);
        });
        return res.status(200).json({ message: 'Archivo subido exitosamente' });
    }catch(error){
        return res.status(500).json({ message: 'No fue posible hacerlo: ', error: error.message });
    }
  });
  

// Define un puerto para escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});