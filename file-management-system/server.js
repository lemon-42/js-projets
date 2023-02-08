const expres = require('express');
const app = expres();
const port = 3000;

// serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
    console.log(`App is listening on : http://localhost:${port}`)
})