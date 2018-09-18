// const FacebookStrategy = require('passport-facebook').Strategy;

// const facebookProfile = {};
// const fbOauth = {
//   fbClientId: `${process.env.fbClientID}`,
//   fbClientSecret: `${process.env.fbClientSecret}`
// };

// const facebook = new FacebookStrategy(
//   {
//     clientID: process.env.fbClientID,
//     clientSecret: process.env.fbClientSecret,
//     callbackURL: `https://${process.env.herokuAppName}/api/oauth/facebook/authenticatedCallback`
//   },
//   (accessToken, _refreshToken, profile, done) => {
//     fbOauth.accessToken = accessToken;
//     facebookProfile.userData = profile;
//     return done(null, profile);
//   }
// );

// module.exports = {
//   strat: facebook,
//   oauth: fbOauth,
//   userData: facebookProfile.userData
// };
