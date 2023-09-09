const path  = require('path');
const multer = require('multer');

// to store the images 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
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
    }
})


module.exports = upload;