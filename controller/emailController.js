const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const correctionMail = asyncHandler(async (req, res) => {
  const { Email, Names, Number, services, Date } = req.body
  try {
    const mailOptions = {
      from: Email,
      to: process.env.EMAIL,
      subject: `📸 New Booking Request from ${Names}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #000;
      margin: 0;
      padding: 0;
      color: #ffffff; /* Solid white for better visibility */
      text-align: center;
      animation: fadeIn 1.5s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #0a0a0a;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0px 0px 20px rgba(255, 223, 186, 0.6);
      border: 1px solid #d4a373;
      overflow: hidden;
    }

    h1 {
      font-size: 28px;
      background: linear-gradient(to right, #d4a373, #896e69);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }

    p {
      line-height: 1.8;
      font-size: 16px;
      color: #ffffff; /* Solid white for better visibility */
    }

    .info {
      text-align: left;
      margin: 20px 0;
      border-top: 1px solid #896e69;
      padding-top: 20px;
    }

    .info span {
      font-weight: bold;
      color: #d4a373; /* Highlight color for spans */
    }

    a {
      color: #d4a373;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
      color: #f5c469;
    }

    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #ffffff; /* Solid white for better visibility */
    }

    .footer a {
      margin: 0 10px;
    }

    img {
      width: 80px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
<div class="container">
  <img src="./tofa 2.png" alt="Tofagraphy Studio" />
  <h1>📸 NEW BOOKING REQUEST</h1>
  <p>Hello, You have received a new booking request from <b>${Names}</b></p>

  <div class="info">
    <p><span>Client Name:</span> ${Names}</p>
    <p><span>WhatsApp Number:</span> ${Number}</p>
    <p><span>Client Email:</span> <a href="mailto:${Email}">${Email}</a></p>
    <p><span>Type of Booking:</span> ${services}</p>
    <p><span>Date of Booking:</span> ${Date}</p>
  </div>

  <p>Kindly follow up with the client via email or WhatsApp.</p>

  <div class="footer">
    This email was automatically generated by <strong>Tofagraphy Studio</strong> 🔥
    <br/>
    <a href="https://www.instagram.com/tofagraphy_studio" target="_blank">Instagram</a> | 
    <a href="https://wa.me/${Number}" target="_blank">WhatsApp</a>
  </div>
</div>
</body>
</html>
`,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent: " + info.response)
    res.status(200).json({
      message: "Your Booking Request has been Submitted Successfully!",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({ message: "Email could not be sent." })
  }
})

module.exports = {
  correctionMail,
}
