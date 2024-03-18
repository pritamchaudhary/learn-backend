const File = require("../models/file")
const cloudinary = require("cloudinary").v2;

// localFileUpload -> handler function
exports.localFileUpload = async(req, res) => {
    try {
        // fetch file from request
        const file = req.files.file;
        console.log("File printed: ",file);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        // create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        })
    } catch (error) {
        console.log(error);
    }
}

// imageUpload handler

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) => {
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        // file format supported and upload to cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadApp");
        console.log(response);

        // save entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Uploaded Successfully',
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message: 'Something went wrong',
        })
    }
}

// videoUpload handler

exports.videoUpload = async(req, res) => {
    try {
        // data fetch
        const{name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        } 
        // file format supported and upload to cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadApp");
        console.log(response);

        // save entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video Uploaded Successfully',
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}

// imageSizeReducer

exports.imageSizeReducer = async (req, res) => {
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        // TODO: add a upper limit of 5MB for file
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        // file format supported and upload to cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadApp", 30);
        console.log(response);

        // save entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Uploaded Successfully',
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}