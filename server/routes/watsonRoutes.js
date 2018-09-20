const router = require('express').Router();
const passport = require('passport');
const request = require('request');
const authenticate = require('./authenticate.js');
const createPost = require('./createPost.js');
const twitter = require('../../utility/passport/twitter');
// const facebook = require('../../utility/passport/facebook');
const { retrieveTokens } = require('../../database/index');
const util = require('../../utility/index');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

router.post('/getPersonality', (req, res) => {
  var personalityInsights = new PersonalityInsightsV3 ({
    username: '264dd11f-9485-4a1d-a4d2-10389711df8f',
    password: 'DIOxnbox8KRp',
    version: '2017-10-13',
    url: 'https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2017-10-13'
  });
  personalityInsights.profile(
    {
      content: 'The world is very different now. For man holds in his mortal,powerful, wild, crazy hands the power to abolish all forms of human poverty and all forms of human life. And yet the same revolutionary beliefs for which our forebears fought are still at issue around the globe -- the belief that the rights of man come not from the generosity of the state but from the hand of God. We dare not forget today that we are the heirs of that first revolution. Let the word go forth from this time and place, to friend and foe alike, that the torch has been passed to a new generation of Americans -- born in this century torch has been passed to a new generation of Americans -- born in this century heritage -- and unwilling to witness or permit the slow undoing of those human rights to which this nation has always been committed, and to which we are',
      content_type: 'text/plain',
      consumption_preferences: true
    },
    function(err, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('success!!!')
        console.log(JSON.stringify(response, null, 2));
      }
    }
  );
});

router.get('/getTone', (req,res)=> {
  var toneAnalyzer = new ToneAnalyzerV3({
    username: 'c2ef87b2-7083-4955-8520-b5576740100c',
    password: 'qCXrdHEQEzjp',
    version: '2017-09-21',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
  });
  toneAnalyzer.tone(
    {
      tone_input: 'The world is very different now. For man holds in his mortal,powerful, wild, crazy hands the power to abolish all forms of human poverty and all forms of human life. And yet the same revolutionary beliefs for which our forebears fought are still at issue around the globe -- the belief that the rights of man come not from the generosity of the state but from the hand of God. We dare not forget today that we are the heirs of that first revolution. Let the word go forth from this time and place, to friend and foe alike, that the torch has been passed to a new generation of Americans -- born in this century torch has been passed to a new generation of Americans -- born in this century heritage -- and unwilling to witness or permit the slow undoing of those human rights to which this nation has always been committed, and to which we are',
      content_type: 'text/plain'
    },
    function(err, tone) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(tone, null, 2));
      }
    }
  );
})








// router.post('/getPersonality', (req, res) => {
//     let postData = {
//       content: 
//     }
//     let options = {
//       method: 'POST',
//       auth: {
//         username: ,
//         password: 
//       },
//       body: postData,
//       json: true,
//       url: 'https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2017-10-13'
//     }
//     request.post(options, (error, response) => {
//       console.log('hey hey hey')
//       if (error) {
//        console.log('error!')
//         res.end()
//       } else {
//       console.log('Success!  SERVER responded with',response);
//       res.send(response)
//       }
//     })
// })

module.exports = router;



