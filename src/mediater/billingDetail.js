const nodemailer = require('nodemailer');
require('dotenv').config();

const billingDetailMail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'fa21bscs0017@maju.edu.pk',
        pass: 'eoeb amae fgaw adeu',
      },
    });

    const productsInfo = data.products.map(product => 
      `Product ID: ${product.productId}, Quantity: ${product.quantity}, Price: ${product.price}`
    ).join('\n');

    const mailUser = {
      from: `${process.env.EMAIL_USER}`,
      to: data.email,
      subject: `Billing Detail - ${data.firstName} ${data.lastName}`, 
      text: `
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Address: ${data.address}
        Products Purchased:
        ${productsInfo}
      `,
    };

    const mailClient = {
      from: `${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: `New Order from ${data.firstName} ${data.lastName}`,
      text: `
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Address: ${data.address}
        Products Purchased:
        ${productsInfo}
      `,
    };

    // Send emails
    await transporter.sendMail(mailUser);
    await transporter.sendMail(mailClient);
    return true;
  } catch (err) {
    console.error('Error sending email:', err);
    return false;
  }
};

module.exports = billingDetailMail;
