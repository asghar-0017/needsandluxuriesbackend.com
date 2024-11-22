const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const sendResetEmail = async (email, code) => {
    const mailOptions = {
        from: `"Needs and Luxuries" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Your reset code is: ${code}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
