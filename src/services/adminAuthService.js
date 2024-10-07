const bcrypt = require('bcryptjs');
const authRepository = require('../Repository/adminAuthRepository');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = 'thisssssssssisverysecret';

const adminService = {
  login: async ({ userName, password }) => {
    const admin = await authRepository.findByUserName(userName);
    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign({ userName: admin.userName, role: admin.role }, secretKey, { expiresIn: '10h' });

        // Add the new session token to the sessions array
        admin.sessions.push({ token });
        await authRepository.save(admin);

        return token;
      }
    }
    return null;
  },

  logout: async (token) => {
    const admin = await authRepository.findTokenByToken(token);
    if (admin) {
      admin.sessions = admin.sessions.filter((session) => session.token !== token);
      await authRepository.save(admin);
      return true;
    }
    return false;
  },

  saveResetCode: async (code, email) => {
    const admin = await authRepository.findByEmail(email);
    if (admin) {
      admin.resetCode = code;
      await authRepository.save(admin);
      return true;
    }
    return false;
  },
  
  validateResetCode: async (code) => {
    const admin = await authRepository.findByResetCode(code);
    return !!admin;
  },

  updatePassword: async (newPassword) => {
    const email="rajaasgharali009@gmail.com"
    const admin = await authRepository.findByEmail(email);
    if (admin) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await authRepository.save(admin);
      return true;
    }
    return false;
  },

  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      const admin = await authRepository.findByUserName(decoded.userName);
      if (admin && admin.sessions.some((session) => session.token === token)) {
        return { isValid: true, role: decoded.role };
      }
    } catch (error) {
      console.error('Error verifying token', error);
    }
    return null;
  },
};

module.exports = adminService;
