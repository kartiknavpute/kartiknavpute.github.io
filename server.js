const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML)
app.use(express.static('public')); // put your HTML and CSS in the 'public' folder

// POST route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, comment } = req.body;

  // Configure the transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kartikgnavpute@gmail.com', // replace with your Gmail email
      pass: 'uqrs biyf flsz pqyf' // replace with your Gmail app password
    }
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'kartikgnavpute@gmail.com', // your email where you want to receive the messages
    subject: `New message from ${name}`,
    text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${comment}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error);
    }
    res.send('Email sent successfully: ' + info.response);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
