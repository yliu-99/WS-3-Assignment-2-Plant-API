// Storage condiguration for handling file uploads with specified destination and filename formatting.

// require multer to handle file uploads
const multer = require("multer");

// diskStorage lets us control where files are saved and what they're named
const storage = multer.diskStorage({
  // Save all uploaded files into the uploads/ folder
  destination: (req, file, cb) => { cb(null, "uploads"); },

  // add a prefix of the timestamp to the filename to avoid duplicated filenames
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
