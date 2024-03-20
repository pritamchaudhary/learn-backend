const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
});

// post middleware
fileSchema.post("save", async function(doc) {
    try {
        // transporter
        // TODO: shift this configuration under /config folder
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
        })
        // send mail
        let info = await transporter.sendMail({
            from:`pritam`,
            to:doc.email,
            subject:"New File uploaded on Cloudinary",
            html:`<h2>Hello Jee</h2> <p>File Uploaded</p> View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
        })
        console.log("INFO", info);
    } catch (error) {
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;  