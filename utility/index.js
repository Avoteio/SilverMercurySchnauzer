/*
    Currently used to grab required properties from each tweet object from Twitter.

    Can be refactored to grab required properties from each input object.
    Create new <post>Fields array for each platform.
*/

let tweetFields = [ 
  'created_at', 
  'id', 
  'id_str', 
  'text',  
  'user',
  'extended_tweet',
  'extended_tweet.full_text',
  'quote_count', 
  'reply_count', 
  'retweet_count',
  'favorite_count', 
  'entities' ];

function scrapeObj (fieldNames, inputObj) {
  let outputObj = {};

  for (let i = 0; i < fieldNames.length; i++) {
    if(fieldNames[i] in inputObj) {
      outputObj[fieldNames[i]] = inputObj[fieldNames[i]];
    }
  }
  return outputObj;
}

function scrapeArr (fieldNames, inputArr) {
  let outputArr = [];
  for (let j = 0; j < inputArr.length; j++) {
    outputArr.push(scrapeObj(fieldNames, inputArr[j]))
  }
  return outputArr;
}

module.exports = {
  tweetFields: tweetFields,
  scrapeObj: scrapeObj,
  scrapeArr: scrapeArr
}
