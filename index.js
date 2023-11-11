const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
// const emailRouter = require("./routes/emailRoutes")
const morgan = require("morgan")
const helmet = require("helmet")
const PORT = process.env.PORT || 4000
const emailRouter = require("./routes/emailRoutes")
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use("/api/email", emailRouter)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})