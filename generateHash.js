const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'demopassword';

bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  if (err) {
    console.error(err);

  }
});
