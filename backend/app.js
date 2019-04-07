const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const validateGoogleToken = require('./validate-google-token');
const validateFbToken = require('./validate-fb-token');

const app = express();

app.listen(3000, () => console.log('Backend kuuntelee porttia: 3000'));

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));


// Ottaa vastaan Googlen sosiaalisen kirjautumisen tiedot
app.post('/googlelogin', (req, res) => {
  // Otetaan tullut id-token muuttujaan
  const idToken = req.body.idToken;

  // Kutsutaan validate-google-token.js -tiedostossa olevaa funktiota
  validateGoogleToken(idToken)
    .then(creds => {
      console.log(creds);
      return res.send(creds);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
});


// Ottaa vastaan Facebookin sosiaalisen kirjautumisen tiedot
app.post('/fblogin', (req, res) => {
  // Kutsutaan validate-fb-token.js -tiedostossa olevaa funktiota
  validateFbToken(req.body.accessToken, (creds, err) => {
    if (err) {
      return res.status(500).send(err);
    }
    // Lähetään Facebookin GRAPH-APIsta saamat tiedot
    return res.send(creds);
  })
});
