require('dotenv').config({path: "dot.env"})

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const fileUpload = require('express-fileupload');
const path = require('path')
app.use(morgan('dev'))
app.use(fileUpload());
app.use(cors())
app.use(express.json())
app.use(require('./routes'))
app.use(express.static(path.join(__dirname)))


app.post('/upload/:id',  function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/assets/images/avatars/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');

  })})
  
app.post('/upload/simulators/add',  function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/assets/images/simulators/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');

  })})
  app.post('/upload/goods/add',  function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/assets/images/sportsNutrition/' + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
  
    })})
mongoose.set('strictQuery', true);

const {PORT, MONGO_SERVER} = process.env

const connectAndStartServer = async () => {
    try {
      await mongoose.connect(MONGO_SERVER);
  
      app.listen(PORT, () => {
        console.log(`Успешно соединились. Порт ${PORT}`);
      });
    } catch (e) {
      console.log(`Ошибка при подключении: ${e.toString()}`);
    }
  };
  
  connectAndStartServer();