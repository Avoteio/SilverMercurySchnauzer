const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Pool } = require('pg');

const conn = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: true
});


exports.selectAll = callback => {
  conn.query('SELECT * FROM posts', (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

exports.saveUser = (username, password, callback) => {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    const queryString = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    conn.query(queryString, [username, hash], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  });
}

exports.validateUser = (loginName, loginPassword, callback) => {
  const queryString = `SELECT * FROM users WHERE username LIKE ($1)`;
    conn.query(queryString, [loginName], (err, results) => {
      const hash = results.rows && results.rows[0] ? results.rows[0].password : '';
      bcrypt.compare(loginPassword, hash, (err, result) => {
        const userIdUsernamePassword = results.rows ? results.rows[0] : null;
        if (err) {
          callback(err, null);
        } else {
          if (!result) {
            callback(null, 'Wrong Password')
          } else {
            callback(null, userIdUsernamePassword);
          }
        }
      });
    });
};
    
exports.savePost = (userId, caption, text, mediaUrl, date, callback) => {
  console.log('args for date in DB-->', date );
  const queryString = `INSERT INTO posts (user_id, caption, text, media_url, post_date) VALUES ($1, $2, $3, $4, $5)`;
  conn.query(queryString, [userId, caption, text, mediaUrl, date], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

exports.checkOauthTokens = (userId, callback) => {
  const queryString = `SELECT COUNT(*) FROM tokens WHERE user_id = $1 GROUP BY user_id;`;
  conn.query(queryString, [userId], (err, tokenCount) => {
    let hasTokens = tokenCount && tokenCount.rows[0] ? !!tokenCount.rows[0].count : false;
    if (err) {
      callback(err, null);
    } else {
      callback(null, hasTokens);
    }
  });
};

exports.updateToken = (userId, tokenObj, callback) => {
  let queryString;
  if(tokenObj.provider === 'twitter') {
    queryString = `
    INSERT INTO tokens 
      (user_id, ${tokenObj.provider}_token, ${tokenObj.provider}_token_secret) 
    VALUES 
      ('${userId}', '${tokenObj.token}', '${tokenObj.secret}')`;
  } else if (tokenObj.provider === 'facebook' || tokenObj.provider === 'instagram') {
    queryString = `
    INSERT INTO tokens 
      (user_id, ${tokenObj.provider}_token) 
    VALUES 
      ('${userId}', '${tokenObj.token}')`;
  } else {
    console.log('Invalid token provider');
    callback('Invalid token provider', null);
  }
  conn.query(queryString, function(err, results) {
    if (err) {
      console.log('Database error on updateToken: ', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}

exports.retrieveTokens = (userId, callback) => {
  conn.query(`SELECT * FROM tokens WHERE user_id = ${userId}`, function(err, results) {
    if (err) {
      console.log('Database error on retrieveTokens: ', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}

exports.deletePost = (record_id, callback) => {
  let query = 'DELETE FROM posts WHERE id= $1';
  conn.query(query, [record_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null,result);
    }
  });
}