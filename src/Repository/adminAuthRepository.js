const Admin = require('../model/adminAuth');

const authRepository = {
  findByUserName: async (userName) => {
    return await Admin.findOne({ userName });
  },

  findByEmail: async (email) => {
    console.log("Email",email)
    return await Admin.findOne({ email });
  },

  findByResetCode: async (resetCode) => {
    return await Admin.findOne({ resetCode });
  },

  save: async (admin) => {
    return await admin.save();
  },

  findTokenByToken: async (token) => {
    return await Admin.findOne({ "sessions.token": token });
  }
  
};

module.exports = authRepository;
