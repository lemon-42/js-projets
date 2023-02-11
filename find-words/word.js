const fs = require('fs');
const readline = require('readline');
const path = require('path');

const fileName = 'text.txt';
const wordToFind = process.argv[2];

const fileStream = fs.createReadStream(path.join(__dirname, fileName));

const fileReader = readline.createInterface({
    input: fileStream
});

let lineNumber = 0;

fileReader.on('line', (line) => {
    lineNumber++;
    if (line.includes(wordToFind)) {
        console.log(`The word : ${wordToFind} was found in line ${lineNumber}`);
    } 
});