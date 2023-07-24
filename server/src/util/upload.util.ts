const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dip4bycwo',
  api_key: process.env.CLOUDINARY_API_KEY || '737281736924518',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'UCeA4lsPHmF5Cepf2-O8Wkh8ahI',
});

// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
//     cb(null, 'uploads'); // store files in the 'uploads' folder
//   },
//   filename: function (req: any, file: { originalname: string }, cb: (arg0: null, arg1: string) => void) {
//     cb(null, Date.now() + '-' + file.originalname); // set the filename to be unique
//   },
// });

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('profileImage');

export { cloudinary, storage, upload };
