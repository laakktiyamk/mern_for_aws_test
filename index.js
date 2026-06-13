/*
const express = require('express');
const path = require('path');
const app = express();

// --- 1. KAIKKI API-REITIT TÄHÄN YLÄREUNAAN ---
app.get('/api/data', (req, res) => {
  try {
    // Lähetetään selkeä teksti, jonka Axios voi lukea
    return res.status(200).send("Express-backend vastaa: Yhteys toimii!!!");
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});


// --- 2. STAATTISET TIEDOSTOT JA TÄHTI-REITTI TÄHÄN ALAREUNAAN ---
// Tämä linja saa olla tässä, mutta sen täytyy olla API-reittien alapuolella
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Tämä kaiken nappaava tähti pitää olla AIVAN ALIMMAISENA ennen app.listenia
app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(8080, () => console.log('Palvelin pyörii portissa 8080'));
*/

// 1. Ladataan dotenv-työkalu, joka lukee .env-tiedoston muistin (vain lokaalisti)
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Tuodaan Mongoose mukaan
const app = express();

// 2. Otetaan yhteys MongoDB Atlas -tietokantaan
// Se hakee osoitteen joko lokaalista .env-tiedostosta TAI AWS-ympäristömuuttujista
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas yhteys muodostettu onnistuneesti! 🍃'))
  .catch((virhe) => console.log('MongoDB yhteysvirhe:', virhe.message));


// --- KAIKKI API-REITIT ---
app.get('/api/data', (req, res) => {
  try {
    return res.status(200).send("Express-backend vastaa: Yhteys toimii lokaalisti! 🎉");
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});


// --- STAATTISET TIEDOSTOT JA TÄHTI-REITTI ---
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(8080, () => console.log('Palvelin pyörii portissa 8080'));
