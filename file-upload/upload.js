const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix =  Date.now() + '-' + Math.round((Math.random()*1E9));
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Unique filename using timestamp
  }
});



// Initialize multer with storage and filter
const upload = multer({
  storage: storage,
});

module.exports = upload;
