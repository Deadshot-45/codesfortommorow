const User = require("../Models/User.model.jS");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SignUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Password not matched",
      });
    }
    const isUser = await User.findOne({ email }); // FIXED
    if (isUser) {
      return res.status(400).json({
        error: true,
        message: "User already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      error: false,
      message: "User creates successfully",
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and password are required",
      });
    }

    const isUser = await User.findOne({ email }); // FIXED
    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: "User not exist",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        error: true,
        message: "Password not matched",
      });
    }

    const token = jwt.sign(
      {
        id: isUser._id,
        email: isUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    if (!token) {
      return res.status(500).json({
        error: true,
        message: "Token generation failed",
      });
    }

    await User.updateOne(
      {
        _id: isUser._id,
      },
      {
        token: token,
      }
    );

    res.status(200).json({
      error: false,
      message: "User signed in successfully",
      data: {
        name: isUser.name,
        email: isUser.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const resetPasword = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, date } = req.body;
    const currentDate = new Date();
    if (date && new Date(date) > currentDate + 50000) {
      return res.status(400).json({
        error: true,
        message: "Reset password link has expired",
      });
    }

    if (!email || !password || !confirmPassword) {
      // FIXED
      return res.status(400).json({
        error: true,
        message: "Email and password are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Password not matched",
      });
    }
    const isUser = await User.findOne({ email }); // FIXED
    if (!isUser) {
      return res.status(404).json({
        // FIXED
        error: true,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.updateOne(
      {
        _id: isUser._id,
      },
      {
        password: hashedPassword,
      }
    );
    res.status(200).json({
      error: false,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

const sendMail = async (email, subject, text) => {
  // This function should implement the logic to send an email
  // For example, using nodemailer or any other email service
  console.log(
    `Sending email to ${email} with subject: ${subject} and text: ${text}`
  );

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
      html: `<p>Click on the link to reset your password: <a href="http://localhost:5173/reset-password">Reset Password</a></p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {}
};

// Call the sendMail function to send the email
const SendMailAPi = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
    const subject = "Link to reset your password";
    const text = `Click on the link to reset your password: http://localhost:5173/reset-password`;
    await sendMail(email, subject, text);
    res.status(200).json({
      error: false,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: true,
      message: "Failed to send email",
    });
  }
};

module.exports = {
  SignUp,
  SignIn,
  resetPasword,
  sendMail,
  SendMailAPi,
};
