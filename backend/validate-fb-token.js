const rp = require('request-promise');

// Funktio validoi ja etsii käyttäjän tietoja Access-tokenin perusteella
function validateFbToken(token, cb) {
  // Tehdään request Facebookin GRAPH API-osoitteeseen
  // Haluamme, että onnistuneessa kyselyssä saamme ID:n sekä sähköpostin.
  rp(`https://graph.facebook.com/me?fields=id,email&access_token=${token}`,
  { json: true })
    .then(creds => {
      // Validointi sekä haku onnistui
      return cb(creds, null);
    }).catch(err => {
      console.log(err);
      // Validointi ja/tai haku epäonnistui
      return cb(null, err);
    })
}

module.exports = validateFbToken;