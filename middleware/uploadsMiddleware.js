const muler = require("multer");
const path = require("path");

const storage = muler.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const filefilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Hanya file JPG, JPEG, dan PNG yang diperbolehkan!"));
    }
};

const upload = muler({
    storage: storage,
    fileFilter: filefilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = upload;
