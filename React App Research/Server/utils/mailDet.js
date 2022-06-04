const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const mail = nodemailer.createTransport({
    // host: "smtp",
    // port: 2525,
    service:process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
});

module.exports = mail;