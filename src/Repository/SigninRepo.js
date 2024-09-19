const {
  generateToken,
  sendEmail,
} = require("../services/clientServices.js");
const ClientModel = require("../model/SigninModel.js");

const ClientSignin = async (user) => {
  try {
    const data = await ClientModel.create(user);
    const token = generateToken(data.email);
    data.token = token;
    await data.save();

    console.log("User created with token");
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { ClientSignin };
