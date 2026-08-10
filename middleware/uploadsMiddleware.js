const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname;           
        cb(null, uniqueSuffix);
    }
});

// Filter file untuk hanya menerima file gambar
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/octet-stream';

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Hanya file JPG, JPEG, dan PNG yang diperbolehkan.'));
    }
};

// Membuat middleware upload menggunakan multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // Batas ukuran file 2MB
    }
});

module.exports = upload;