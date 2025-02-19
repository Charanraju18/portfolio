const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "charanraju925@gmail.com", // Replace with your email
      pass: "mtlx fokw fkta ndxq", // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: "charanraju925@gmail.com", // Admin email to receive messages
    subject: `New Contact Form Submission: ${subject}`,
    text: `From: ${name} (${email})\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

const corsOptions = {
  origin: "*", // Change this to your frontend URL for security (e.g., "https://your-frontend.github.io")
  methods: "POST",
  allowedHeaders: ["Content-Type"],
};
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(cors(corsOptions));

app.listen(5000, () => console.log("Server running on port 5000"));
