require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const db = require('../database/index.js');
const CronJob = require('cron').CronJob
const { publishTweets } = require('../scripts/index')

// ***************************************************************
// see below for helpful getting started guide to cron jobs
// https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
// ***************************************************************

const job = new CronJob('*/1 * * * *', () => {
  publishTweets();
});

job.start();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'toot'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

app.post('/validateuser' , (req, res) => {
  if (req.body.nativeToken) {
    db.checkOauthTokens(req.body.userId, (err, hasOauthTokens) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (hasOauthTokens) {
          res.send('fullyAuthenticated').status(200);
        } else {
          res.send('onlyNative').status(200);
        }
      }
    });
  } else {
    res.send('noAuthentication').status(200);
  }
  
});

// Needed to handle page refresh when using React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
