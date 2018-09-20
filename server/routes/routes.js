const router = require('express').Router();
const passport = require('passport');
const request = require('request');
const authenticate = require('./authenticate.js');
const createPost = require('./createPost.js');
const twitter = require('../../utility/passport/twitter');
// const facebook = require('../../utility/passport/facebook');
const { retrieveTokens } = require('../../database/index');
const util = require('../../utility/index');
const watson = require('./watsonRoutes')

passport.use(twitter.strat);
// passport.use(facebook.strat);
router.use('/createpost', createPost);
router.use('/', authenticate);
router.use('/watson',watson)

const getUserTokens = (req, res, next) => {
  let userId = req.params.userId;
  let oauth = twitter.oauth;

  retrieveTokens(userId, (err, results) => {
    if (err) {
      console.log('Database/Server Error on retrieveTokens: ', err);
      next();
    } else {
      oauth.token = results && results.rows ? results.rows[0].twitter_token : null; 
      oauth.token_secret = results && results.rows ? results.rows[0].twitter_token_secret : null;
      req.oauth = oauth;
      next();
    }
  });
}

router.use('/home/updateTwitterFeed/:userId', getUserTokens);
router.use('/users/:userId/friends', getUserTokens);

router.get('/', (req, res) => {
  res.status(200).json({message: 'connected / GET'});
});

router.get('/home', (req, res) => {
  res.status(200).json({message: 'connected /api/home GET'});
});

router.get('/home/updateTwitterFeed/:userId', (req, res) => {
  request.get({url:`https://api.twitter.com/1.1/statuses/user_timeline.json`, oauth: req.oauth}, (error, response, body) => {
    // pull out required info from each tweet object and send back
    let tweets = util.scrapeArr(util.tweetFields, JSON.parse(body));
    res.send(tweets).status(200);
  });
});

router.get('/users/:userId/friends', (req, res) => {
  request.get({url:`https://api.twitter.com/1.1/friends/ids.json`, oauth: req.oauth}, (error, response, body) => {
    const {ids} = JSON.parse(body);
    Promise.all(ids.map(id => {
      const options = {
        method: 'GET',
        url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${id}&include_rts=0&count=200`,
        oauth: req.oauth
      };
      return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(body));
          }
        });
      });
    }))
    .then((results) => {
      let map = {};
      results.forEach(user => {
        user.forEach(tweet => {
          map[tweet.user.name] ? map[tweet.user.name].push(tweet.text) : map[tweet.user.name] = [tweet.text];
        });
      });
      return map;
    })
    .then(map => {
      res.send(map);
    })
    .catch(err => {
      console.log('nope');
    });
  });
});

router.get('/drafts', (req, res) => {
  res.status(200).json({message: 'connected /api/drafts GET'});
});

module.exports = router;
