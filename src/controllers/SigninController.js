const ClientSignin = require("../services/clientServices.js");

const createclient = async (req, res) => {
  try {
    const user = req.body;
    const data = await ClientSignin.ClientSignin(user);
    console.log(data);
    res.status(200).json({ message: "User created successfully", data: data });
  } catch (error) {
    console.log("Cannot create user", error);
    res.status(500).json({ message: "api server Error" });
  }
};

const login = async (req, res) => {
  try {
    const user = await ClientModel.findOne(
      { email: req.body.email },
      { password: req.body.password }
    );
    const email = req.body.email;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = generateToken(email);
    user.token = token;
    await user.save();
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("Error logging in", error);
  }
};

const forgetpassword = async (req, res) => {
  try {
    const user = await ClientModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const code = uuidv4();
    user.code = code;
    await user.save();
    sendEmail(user.email, user.code);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.log("Error verifying email", err);
    res.status(404).json({ message: "error occur" });
  }
};

const PasswordForm = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  res.send(`
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                        .container {
                            background-color: #ffffff;
                            padding: 2rem;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            max-width: 400px;
                            width: 100%;
                        }
                        h2 {
                            margin-bottom: 1rem;
                            color: #333;
                        }
                        label {
                            display: block;
                            margin-bottom: 0.5rem;
                            color: #555;
                        }
                        input[type="password"] {
                            width: calc(100% - 22px);
                            padding: 10px;
                            margin-bottom: 1rem;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                        }
                        button {
                            width: 100%;
                            padding: 10px;
                            background-color: #007bff;
                            border: none;
                            border-radius: 4px;
                            color: #fff;
                            font-size: 16px;
                            cursor: pointer;
                        }
                        button:hover {
                            background-color: #0056b3;
                        }
                        .message {
                            margin-top: 1rem;
                            font-size: 14px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Reset Your Password</h2>
                        <form action="/reset-password" method="POST">
                            <input type="hidden" name="email" value="${email}" />
                            <label for="newPassword">New Password:</label>
                            <input type="password" id="newPassword" name="newPassword" required />
                            <label for="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required />
                            <button type="submit">Reset Password</button>
                        </form>
                        <p class="message">Enter your new password and confirm it to reset your password.</p>
                    </div>
                </body>
                </html>
            `);
};

const UpdatePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate that both password fields match
    if (newPassword !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    // Find the user by email
    const user = await ClientModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Hash the new password and update the user's password in the database

    user.password = newPassword;
    await user.save();

    // Return the new password (for testing purposes only; not recommended for production)
    res.send(`New password is: ${newPassword}`);
  } catch (err) {
    console.log("Error updating password", err);
  }
};
module.exports = {
  createclient,
  login,
  forgetpassword,
  PasswordForm,
  UpdatePassword,
};
