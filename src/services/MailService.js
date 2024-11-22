require('dotenv').config();
const nodemailer = require('nodemailer');

const Mail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
      }
  });

    const mailUser = {
      from: `${process.env.EMAIL}`, // sender address
      to: data.email, // recipient email
      subject: `${data.subject}`, // email subject
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
    };
    const mailClient = {
        from: `fa21bscs0017@maju.edu.pk`, // sender address
        to: 'fa21bscs0017@maju.edu.pk', // recipient email
        subject: `${data.subject}`, // email subject
        text: `
          Name: ${data.name}
          Email: ${data.email}
          Message: ${data.message}
        `,
      };

    await transporter.sendMail(mailUser);
    await transporter.sendMail(mailClient);
    return true;
  } catch (err) {
    console.error('Error sending email:', err);
    return false; // or throw an error if needed
  }
};

module.exports = Mail;
