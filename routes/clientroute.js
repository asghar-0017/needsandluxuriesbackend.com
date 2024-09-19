const { createclient,login,forgetpassword,PasswordForm, UpdatePassword } = require("../controllers/SigninController.js");
const Routes = (app) => {
    app.post("/signup", createclient); // Bind the route to the app object
    app.post("/login", login);
    app.post("/forgetpassword",forgetpassword)
    app.get("/reset-password",PasswordForm )
    app.post("/reset-password",UpdatePassword )
};

module.exports = Routes; // Export the Routes function directly, not as an object
