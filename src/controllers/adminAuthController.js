const adminService = require('../services/adminAuthService');
const generateResetCode = require('../mediater/generateOrderId');
const { sendResetEmail } = require('../mediater/sendResetMail');
const dotenv = require('dotenv');

dotenv.config();

const adminAuth = {
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;
      const token = await adminService.login({ userName, password });

      if (token) {
        res.status(200).send({ token });
      } else {
        res.status(404).send({ message: 'Invalid Username or Password' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      // Extract token from authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'No token provided' });
      }
  
      const token = authHeader.split(' ')[1];
  
      // Call the service to handle token invalidation
      const result = await adminService.logout(token);
  
      if (result) {
        res.status(200).send({ message: 'Logged out successfully' });
      } else {
        res.status(401).send({ message: 'Invalid token' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },
  

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const code = generateResetCode();
      console.log("Email",email)
      console.log("code",code)
      const result = await adminService.saveResetCode(code, email);

      if (result) {
        await sendResetEmail(email, code);
        res.status(200).send({ message: 'Password reset code sent.' });
      } else {
        res.status(400).send({ message: 'Invalid Email Address' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  verifyResetCode: async (req, res) => {
    try {
      const { code } = req.body;
      const isCodeValid = await adminService.validateResetCode(code);

      if (isCodeValid) {
        res.status(200).send({ message: 'Code verified successfully.' });
      } else {
        res.status(400).send({ message: 'Invalid or expired code.' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log("password",password)
      await adminService.updatePassword(password);
      res.status(200).send({ message: 'Password reset successfully.' });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ code: 401, message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const isValid = await adminService.verifyToken(token);

      if (isValid) {
        res.status(200).send({ code: 200, isValid: true, role: isValid.role });
      } else {
        res.status(401).send({ code: 401, message: 'Invalid token or role' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },
};

module.exports = { adminAuth };
