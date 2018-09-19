const db = require('../database/index');
const moment = require('moment');
const twitter = require('../utility/passport/twitter.js');
const request = require('request');

exports.publishTweets = () => db.selectAll((err, results, fields) => {
  if (err) {
    console.log('err fetching posts');
  } else if (results.rows.length) {
   //compare the post date with current data/time 
    const fifteenMinsAgo = moment().subtract(15, 'minutes');
    results = results.rows.filter(t => moment().diff(t.post_date) > 0);
    console.log(results);
    // console.log('posts are ready to be published-->', results)
    //const publishThisPost = results[0];

    // results.forEach(publishThisPost => {
    //   let userId = publishThisPost.user_id;
    //   let oauth = twitter.oauth;
    //   let qs = {
    //     status: `${publishThisPost.caption}  ${publishThisPost.text}  ${publishThisPost.media_url}`
    //   }
    //   db.retrieveTokens(userId, (err, results) => {
    //     if (err) {
    //       console.log('Database/Server Error on retrieveTokens: ', err);
    //     } else {
    //       oauth.token = results && results.rows ? results.rows[0].twitter_token : null;
    //       oauth.token_secret = results && results.rows ? results.rows[0].twitter_token_secret : null;
    //       request.post({
    //         url: `https://api.twitter.com/1.1/statuses/update.json`,
    //         oauth: oauth,
    //         qs: qs
    //       }, (error, response, body) => {
    //         console.log('Used twitter oauth headers: ', oauth);
    //         console.log('Used qs: ', qs);
    //         console.log('ERROR: ', error);
    //         console.log('Body: ', body);
    //         db.deletePost(publishThisPost.id, (err, result) => {
    //           if (err) {
    //             console.log('err', err)
    //           } else {
    //             console.log('deleted post from DB', result);
    //           }
    //         })
    //       })
    //     }
    //   })
    // })
    
  }
});