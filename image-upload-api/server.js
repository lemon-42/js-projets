const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// define the storage location for the uploaded files
const uploadDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// route
app.post('/upload', upload.single('file'), (req,res) => {

    res.set('Content-Type', 'image/jpeg');

    const filename = req.file.originalname;

    console.log(`File ${filename} uploaded successfully!`);

    if (filename) {
        res.send(`File ${filename} uploaded successfully!`);
    } else {
        console.log('No filename provided in the header');
        res.status(400).send('No filename provided in the header');
    }
});

app.use('/uploads', express.static(uploadDir));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
