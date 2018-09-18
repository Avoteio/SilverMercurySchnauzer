const router = require('express').Router();
const passport = require('passport');
const request = require('request');
const authenticate = require('./authenticate.js');
const createPost = require('./createPost.js');
const twitter = require('../../utility/passport/twitter');
// const facebook = require('../../utility/passport/facebook');
const { retrieveTokens } = require('../../database/index');
const util = require('../../utility/index');

passport.use(twitter.strat);
// passport.use(facebook.strat);
router.use('/createpost', createPost);
router.use('/', authenticate);

router.get('/', (req, res) => {
  res.status(200).json({message: 'connected / GET'});
});

router.get('/home', (req, res) => {
    res.status(200).json({message: 'connected /api/home GET'});
});

router.get('/home/updateTwitterFeed/:userId', (req, res) => {
  let userId = req.params.userId;
  let oauth = twitter.oauth;

  retrieveTokens(userId, (err, results) => {
    if (err) {
      console.log('Database/Server Error on retrieveTokens: ', err);
    } else {
      oauth.token = results && results.rows ? results.rows[0].twitter_token : null; 
      oauth.token_secret = results && results.rows ? results.rows[0].twitter_token_secret : null;
      request.get({url:`https://api.twitter.com/1.1/statuses/user_timeline.json`, oauth: oauth}, (error, response, body) => {
        // pull out required info from each tweet object and send back
        let tweets = util.scrapeArr(util.tweetFields, JSON.parse(body));
        res.send(tweets).status(200);
      })      
    }
  })
});


router.get('/drafts', (req, res) => {
  res.status(200).json({message: 'connected /api/drafts GET'});
});

module.exports = router;
