const express = require("express");
//const router = express.Router();
const multer = require('multer');

// Storage Strategy for multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// File Filter for appropriate File

const fileFilter = (req, file, cb) => {
    // reject a file 
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg') // check certain file type
    {
        cb(null, true); // if tyue, then will accept the file
    }else{
        cb(null, false); //else, will reject the file
    }
    
    
};
const upload = multer({storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5,
        fields: 2,
        files: 3
    },
    fileFilter: fileFilter
});

const port = process.env.PORT || 8079;
const app = express();

// Upload Single File
app.post('/UploadImg',upload.single('uploadImage'),(req, res, next)=>{
    console.log(req.file);
    return res.json(req.file);
});

// Upload Multiple Files

app.post('/UploadMultiImg',upload.array("uploadImage",3),(req, res, next)=>{

    return res.json(req.files.map(el =>{ 
        console.log(el.path);
        return el.path;
    }));
});

 app.listen(port,()=>{
     console.log(`App listening on Port${port}`);
 });