const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fa21bscs0017@maju.edu.pk',
        pass: 'eoeb amae fgaw adeu'
    }
});

const sendResetEmail = async (email, code) => {
    const mailOptions = {
        from: `"Needs and Luxuries" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Your reset code is: ${code}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
