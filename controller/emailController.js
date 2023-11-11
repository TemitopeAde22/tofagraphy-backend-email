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
    const { Email, Names, Number, services, Date, message } = req.body

    try {
        const mailOptions = {
            from: Email,
            to: process.env.EMAIL,
            subject: `New Booking from ${Names}`,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: black;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background-color: black;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            text-align: center;
        }

        .header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: white;
        }

        .message {
            color: white;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="message">Booking From</h1>
        <p class="message">You are receiving this email because a user ${Names}, ${Email} requested for Booking</p>
        <h2 class="message">Client Name:</h2>
        <p class="message">${Names}</p>
        <h2 class="message"> Mobile Number:</h2>
        <p class="message">${Number}</p>
        <h2 class="message">Client Email:</h2>
        <p class="message">${Email}</p>
         <h2 class="message">Type of Booking</h2>
        <p class="message">${services}</p>
        <h2 class="message">Date of Booking</h2>
        <p class="message">${Date}</p>
            <h2 class="message">Message</h2>
          <p class="message">${message}</p>
    </div>
</body>
                  </html>`,
        }

        const info = await transporter.sendMail(mailOptions)

        console.log("Email sent: " + info.response)
        res.status(200).json({ message: "Your Response has Been Recorded!" })
    } catch (error) {
        console.error("Error sending email:", error)
        res.status(500).json({ message: "Email could not be sent." })
    }
})

module.exports = {
    correctionMail,
}
