require('dotenv').config();
const chai = require('chai');
const nodemailer = require('nodemailer');

chai.should();

describe('Sending contact mail', () => {
  it('Should send mail', async () => {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 465,
      secure: true,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>"
    }, (err, info) => {
      err.should.be.undefined;
      done();
    });
  })
});