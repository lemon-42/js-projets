const express = require('express');
const app = express();
const upload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(upload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/file', (req,res) => {
    fs.readdir('./storage', (err,files) => {
        if (err) {
            return res.status(500).send(err)
        }
        let html = '<table>';
        html += '<tr><th>File name</th><th>File size</th><th>File type</th><th>Download</th><th>Delete</th></tr>';
            files.forEach(file => {
                let filePath = path.join('./storage', file);
                let stats = fs.statSync(filePath);
                let size = stats["size"];
                let type = file.split('.').pop();
        html += `<tr><td>${file}</td><td>${size}</td><td>${type}</td><td><a href="/download/${file}">Download</a></td><td><form action="/delete" method="POST"><input type="hidden" name="filename" value="${file}"><button type="submit">Delete</button></form></td></tr>`;
        });
        html += '</table>';
        html += '<br><a href="/">Go back</a>';

        res.send(html);
    })
})

app.post('/delete', (req,res) => {
    // if the user click on the delete button in the table, the file will be deleted
    let filename = req.body.filename;
    let filePath = path.join(__dirname, 'storage', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err)
            res.send('Error Occured')
        } else {
            res.redirect('/file')
        }
    })
});

app.get('/download/:file', (req,res) => {
    const file = req.params.file;
    const filePath = path.join(__dirname, 'storage', file);
    res.download(filePath, file);
})

app.post('/', (req,res) => {
    if (req.files) {
        console.log(req.files)
        let file = req.files.file
        let filename = file.name

        file.mv('./storage/' + filename, (err) => {
            if (err) {
                console.log(err)
                res.send('Error Occured')
            } else {
                res.redirect('/file')
            }
        })
    }
})

app.listen(port, () => {
    console.log(`Server started on : http://localhost:${port}`);
}) 