const { OAuth2Client } = require('google-auth-library');

// Google+ APIn Client ID
const CLIENT_ID = '{{GOOGLE_CLIENT_ID}}.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Function which validates ID-token received from frontend
async function validateGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  console.log(payload);
  const userid = payload['sub'];
  const email = payload['email'];
  return { userid, email };
}

module.exports = validateGoogleToken;
