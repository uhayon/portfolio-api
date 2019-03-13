const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }

  return transporter;
}

const createTransporter = () => {
  console.log('Created from scracth');
  return nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASS
    }
  });
};

const sendMail = (logger) => (req, res) => {
  const transporter = getTransporter();
  transporter.verify((error, success) => {
    if (error) {
      logger.error('verifyMail - ' + error);
      return res.status(500).json('Unable to process the request, please try again');
    }

    const { name, mail, company, motive, message } = req.body;

    transporter.sendMail({
      from: `"${name}" <${mail}>`,
      to: process.env.MAIL_APP_RECEIVER,
      subject: motive,
      text: `
        Person: ${name} (${mail})\n
        Company: ${company.trim() !== '' ? company : 'No company entered'}.\n
        \n
        ${message}
      `
    }, (err, info) => {
      if (err) {
        logger.error('sendMail - ' + error);
        return res.status(500).json('Unable to process the request, please try again');
      }
      res.json('Mail sent successfully');
    });
    
  });
};

module.exports = {
  sendMail
}