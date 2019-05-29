const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');


admin.initializeApp(functions.config().firebase);

// get questions
let questions;
try {
  const qFile = fs.readFileSync('./resource/questions.yml', 'utf-8');
  questions = yaml.safeLoad(qFile);
  console.log('load questions.yaml!')
} catch (err) {
  console.log(err);
}

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'ストレス診断' });
});

app.get('/questions.json', (request, response) => {
  response.json(questions);
});

// app.get('/edit', (req, res) => {

// });



exports.app = functions.https.onRequest(app);
