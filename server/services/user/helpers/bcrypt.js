const bcrypt = require("bcryptjs");
const SALT = process.env.SALT;

const salt = bcrypt.genSaltSync(+SALT);
const passwordHash = (pass) => bcrypt.hashSync(pass, salt);
const comparePass = (pass, hashedPass) =>
  bcrypt.compareSync(pass, hashedPass, salt);

module.exports = { passwordHash, comparePass };
