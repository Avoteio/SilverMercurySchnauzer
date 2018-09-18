const TwitterStrategy = require('passport-twitter').Strategy;

const twitterProfile = {};
const twOauth = {
  consumer_key: `${process.env.twConsumerKey}`,
  consumer_secret: `${process.env.twConsumerSecret}`
};

const twitter = new TwitterStrategy(
  {
    consumerKey: process.env.twConsumerKey,
    consumerSecret: process.env.twConsumerSecret,
    callbackURL: `${process.env.herokuAppName}/api/oauth/twitter/authenticatedCallback`
  },
  (token, tokenSecret, profile, done) => {
    twOauth.token = token;
    twOauth.token_secret = tokenSecret;
    twitterProfile.userData = profile;
    return done(null, profile);
  }
);

module.exports = {
  strat: twitter,
  oauth: twOauth,
  userData: twitterProfile.userData
};
