const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

io.on('connection', (socket) => {  
    socket.on('articleUpdated', (article) => {
        io.emit('articleUpdated', article);
    });
    socket.on('articleAdded', (article) => {
        io.emit('articleAdded', article);
    }
    );
    socket.on('articleDeleted', (article) => {
        io.emit('articleDeleted', article);
    }
    );
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Public/login.html');
})

app.post('/login', (req, res) => {
    const user = req.body;
    if (user.username === 'admin' && user.password === 'admin') {
        res.redirect('/')
    } else {
        res.status(401).send('Invalid username or password');
    }
})

app.get('/articles', (req, res) => {
    res.sendFile(__dirname + '/Public/articles.json');
})

app.put('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedArticle = req.body;
    const articles = require('./Public/articles.json');

    const article = articles.find((article) => article.id === id);

    if (!article) {
        res.status(404).send('Article not found');
        return;
    }

    article.title = updatedArticle.title;
    article.content = updatedArticle.content;

    fs.writeFile('./Public/articles.json', JSON.stringify(articles), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error while updating the article');
        } else {
            res.status(200).send('Article updated successfully');
        }
    });
    io.emit('articleUpdated', updatedArticle);
})

app.post('/addArticles', (req, res) => {
    let articles = require('./Public/articles.json');
    const newArticle = req.body;
    newArticle.id = articles.length + 1;
    articles.push(newArticle);
    fs.writeFile('./Public/articles.json', JSON.stringify(articles), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error while adding the article');
        } else {
            res.status(200).send('Article added successfully');
        }
    });
    io.emit('articleAdded', newArticle);
});

app.delete('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let articles = require('./Public/articles.json');

    // find the index of the article with the given id
    const index = articles.findIndex(article => article.id === id);

    if (index === -1) {
        res.status(404).send('Article not found');
        return;
    }

    articles.splice(index, 1);

    fs.writeFile('./Public/articles.json', JSON.stringify(articles), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error while deleting the article');
        } else {
            res.status(200).send('Article deleted successfully');
        }
    });
    io.emit('articleDeleted', id);
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/login`)
})