const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const orderId=require('./generateOrderId')

const billingDetailMail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'rajaasgharali009@gmail.com',
          pass: 'qofo ycaw fued syct'
      }
  });

  const productsInfo = data.products
  .map(
    (product) => `
      <tr>
        <td><img src="${product.Imageurl}" alt="${product.title}" style="width: 50px; height: auto; border-radius: 5px;" /></td>
        <td>${product.name}</td>
        <td style="text-align:center;">${product.quantity}</td>
        <td style="text-align:right;">$${product.price.toFixed(2)}</td>
      </tr>`
  )
  .join('');

const totalPrice = data.products.reduce(
  (total, product) => total + product.quantity * product.price,
  0
);

const mailOptions = {
  from: `"Needs and Luxuries" <admin.needsandluxuries.com>`,
  to: data.email,
  subject: `Order Confirmation - ${data.firstName} ${data.lastName}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <!-- Header -->
      <div style="background-color: #FF5733; padding: 20px; text-align: center;">
        <h1 style="color: white; font-size: 24px; margin: 0;">Needs and Luxuries</h1>
        <p style="color: white; margin: 10px 0;">Hello ${data.firstName}, your order has been successfully placed!</p>
        <h2 style="color: white;">Order ID: ${orderId()}</h2>
      </div>

      <!-- Shipping Details -->
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0;">Shipping Address</h2>
        <p><strong>${data.firstName} ${data.lastName}</strong></p>
        <p>${data.address}</p>
      </div>

      <!-- Order Summary -->
      <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="text-align: left; padding: 10px;">Product Image</th>
            <th style="text-align: left; padding: 10px;">Product</th>
            <th style="text-align: center; padding: 10px;">Quantity</th>
            <th style="text-align: right; padding: 10px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productsInfo}
          <tr>
            <td colspan="3" style="text-align: right; padding-top: 10px; border-top: 1px solid #ddd;"><strong>Total:</strong></td>
            <td style="text-align: right; padding-top: 10px; border-top: 1px solid #ddd;"><strong>$${totalPrice.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div style="background-color: #FF5733; padding: 20px; text-align: center; margin-top: 20px;">
        <p style="color: white;">It may take up to 24 hours for tracking information to update.</p>
        <p style="color: white;">Refer friends and earn rewards - Give Rs50, Get Rs50!</p>
        <a href="#" style="color: white; font-weight: bold; text-decoration: underline;">Learn More</a>
      </div>
    </div>
  `,
  attachments: [
    {
      filename: 'shopIcon.png',
      path: path.join(__dirname, 'images', 'shop.png'),
      cid: 'shopIcon',
    },
  ],
};

const mailClient = {
  from: `"Needs and Luxuries" <admin.needsandluxuries.com>`,
  to: process.env.ADMIN_EMAIL,
  subject: `New Order Notification - ${data.firstName} ${data.lastName}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>New Order Notification</h1>
      <p><strong>Customer:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="padding: 10px;">Product Image</th>
            <th style="padding: 10px;">Product</th>
            <th style="padding: 10px;">Quantity</th>
            <th style="padding: 10px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productsInfo}
          <tr>
            <td colspan="3" style="text-align: right; padding: 10px; border-top: 1px solid #ddd;"><strong>Total:</strong></td>
            <td style="padding: 10px;"><strong>$${totalPrice.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};

// Send emails
await transporter.sendMail(mailOptions);
await transporter.sendMail(mailClient);

return true;
} catch (err) {
console.error('Error sending email:', err);
return false;
}
};

module.exports = billingDetailMail;
