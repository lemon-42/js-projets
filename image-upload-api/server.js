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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.post('/upload', upload.single('file'), (req,res) => {

    res.set('Content-Type', 'image/jpeg');

    // get the file name in the header
    const filename = req.get('x-filename');

    console.log(`File ${filename} uploaded successfully!`);

    if (filename) {
        console.log(`File ${filename} uploaded successfully!`);
        const fileUrl = `http://localhost:${port}/uploads/${filename}`;
        res.json({ filename, url: fileUrl })
    } else {
        console.log('No filename provided in the header');
        res.status(400).send('No filename provided in the header');
    }
});

app.use('/uploads', express.static(uploadDir));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
