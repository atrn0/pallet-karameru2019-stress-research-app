const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const questionsYAMLPath = './resource/questions.yml';


admin.initializeApp(functions.config().firebase);

// get questions
let questions;

function getQuestions() {
  try {
    const qFile = fs.readFileSync(questionsYAMLPath, 'utf-8');
    questions = yaml.safeLoad(qFile);
    console.log('load questions.yaml!')
  } catch (err) {
    console.log(err);
  }
}
getQuestions();

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'ストレス診断' });
});

app.get('/questions.json', (request, response) => {
  response.json(questions);
});

app.get('/edit', (req, res) => {
  res.render('edit');
});

app.post('/edit', (req, res) => {
  console.log('saving new questions');
  console.log(req.body);
  questions.push(yaml.dump(req.body));
  fs.writeFile(questionsYAMLPath, yaml.dump(req.body), 'utf8', (err) => {
    if (err) {
      res.status(500);
      console.log(err);
      res.send(err);
    } else {
      console.log('saved');
      getQuestions();
      res.send('saved');
    }
  });
});


exports.app = functions.https.onRequest(app);
