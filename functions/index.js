const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const contentful = require('contentful');

admin.initializeApp(functions.config().firebase);

let client = contentful.createClient({
  space: 'hv1v2mwqnicv',
  accessToken: 'AtHW_BU_Bjr_FH82-JgTwu0a2W4vx9A6Bw5wfgjbzDs'
})

// get questions
let questions = [];
function getQuestions() {
  client
    .getEntries({
      content_type: 'questionSet'
    })
    .then((entries) => {
      questions = entries.items.map((item) => {
        return {
          "about": item.fields.about,
          "body": item.fields.body.map((body) => {
            return body.fields;
          })
        }
      });
      console.log('get questions!')
      return;
    })
    .catch((err) => {
      console.log(err);
    });
}

getQuestions();

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'ストレス診断' });
});

app.get('/questions.json', (req, res) => {
  getQuestions();
  res.json(questions);
});

exports.app = functions.https.onRequest(app);
