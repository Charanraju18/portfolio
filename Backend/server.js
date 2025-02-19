const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "charanraju925@gmail.com", // Admin email to receive messages
    subject: `Message For You From Portfolio: ${subject}`,
    text: `From : ${name}\nEmail : (${email}) \n\n Message : \n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
