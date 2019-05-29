const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');


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
app.get('/questions.json', (request, response) => {
  response.json(questions);
});



exports.app = functions.https.onRequest(app);
