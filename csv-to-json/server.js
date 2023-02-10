const express = require('express');
const app = express();
const upload = require('express-fileupload');
const csvtojson = require('csvtojson');

const port = 3000;

app.use(upload());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
  if (req.files) {
    let file = req.files.file;
    let filename = file.name;
    let extension = filename.split('.').pop();
    if (extension === 'csv') {
      file.mv(filename, (err) => {
        if (err) {
          res.send(err);
        } else {
          csvtojson().fromFile(filename).then(jsonObj => {
            res.send(jsonObj);
          });
        }
      });
    } else {
      res.send('Please upload a csv file');
    }
  } else {
    res.send('Please upload a file');
  }
});

app.listen(port, () => {
  console.log(`Server is running : http://localhost:${port}`);
});
