const router = require('express').Router();
const jwt = require('jsonwebtoken');
const oauth = require('./oauth.js');
const { saveUser, validateUser } = require('../../database/index');

// oauth routes
router.use('/oauth', oauth);

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  validateUser(username, password, (err, result) => {
    if (err || !result) {
      res.status(500).send(err)
    } else {
      if (result === 'Wrong Password') {
        res.status(200).json({
          message: 'Wrong Password'
        });
      } else {
        const userId = result['id'];
        res.status(200).json({
          username,
          token: jwt.sign({
            username
          }, process.env.JWT_SECRET),
          userId
        });
      }
    }
  })
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  saveUser(username, password, (err, result) => {
    if (err || !result) {
      res.status(500).send(err)
    } else {
      res.status(200).json({
        message: 'User added to DB'
      });
    }
  });
});

router.post('/logout', (req, res) => {
  res.status(200).json({
    message: 'connected /api/logout POST'
  });
});

module.exports = router;
