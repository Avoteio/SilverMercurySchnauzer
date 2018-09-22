const router = require('express').Router();
const { savePost, retrieveTokens } = require('../../database/index');
const twitter = require('../../utility/passport/twitter');
const request = require('request');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'connected /createPost GET'
  });
});

router.post('/save', (req, res) => {
  const { caption, post, url, date, userId } = req.body;
  savePost(userId, caption, post, url, date, (err, result) => {
    if (err || !result) {
      res.status(500).send(err)
    } else {
      res.status(200).json({
        message: 'Post saved to DB'
      });
    }
  });
});

router.post('/publish', (req, res) => {
  let userId = req.body.userId;
  let oauth = twitter.oauth;
  let qs = {
    status: `${req.body.caption}  ${req.body.post}  ${req.body.url}`
  }
  retrieveTokens(userId, (err, results) => {
    if (err) {
      console.log('Error retrieving tokens from database: ', err);
    } else {
      oauth.token = results && results.rows ? results.rows[0].twitter_token : null; 
      oauth.token_secret = results && results.rows ? results.rows[0].twitter_token_secret : null;
      request.post({
        url:`https://api.twitter.com/1.1/statuses/update.json`, 
        oauth: oauth, 
        qs: qs
      }, (error, response, body) => {
        console.log('ERROR: ', error);
        res.send().status(200);
      })      
    }
  })
});

module.exports = router;
