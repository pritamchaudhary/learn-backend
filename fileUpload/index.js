// app create
const express = require('express')
const app = express();

// find port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// connect with DB
const db = require('./config/database');
db.connect();

// connect with cloudinary
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// mount the api route
const Upload = require("./routes/FileUpload")
app.use('/api/v1/upload', Upload);

// activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})
