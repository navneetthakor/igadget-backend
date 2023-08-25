const path  = require('path');
const multer = require('multer');

// to store the images 
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null,Date.now() + ext);
    }
})

// final function witch will execution of storing it 
const upload = multer({
    storage: storage,
    fileFilter: (req,file, cb)=>{
        if(
            file.mimetype == "image/jpeg"||
            file.mimetype == "image/jpg"||
            file.mimetype == "image/png"
        ){
            cb(null, true);
        }else{
            cb(null,false);
        }
    },
    limits: {
        fileSize: 2048 * 2048 * 2
    }
})


module.exports = upload;