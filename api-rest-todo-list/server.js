const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const myList = fs.readFileSync('db.json', 'utf8');

// show all tasks
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/db.json');
});

// add a task
app.get('/add/:task', (req, res) => {
  let task = req.params.task;
  let result = addTask(task);
  res.json(result);
});

// remove a task
app.get('/remove/:id', (req, res) => {
  let id = req.params.id;
  let result = removeTask(id);
  res.json(result);
});

// show a task
app.get('/list/:id', (req, res) => {
  let id = req.params.id;
  res.json(findId(id));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function findId(id) {
  let data = JSON.parse(myList);
  let result = data.filter((item) => {
    return item.id == id;
  });
  return result;
}

function addTask(task) {
  let data = JSON.parse(myList);
  let newTask = {
    id: data.length + 1,
    // random username
    username: 'user' + Math.floor(Math.random() * 100),
    task: task,
    status: 'pending',
  };
  data.push(newTask);
  fs.writeFileSync('db.json', JSON.stringify(data));
  return data;
}

function removeTask(id) {
  let data = JSON.parse(myList);
  let result = data.filter((item) => {
    return item.id != id;
  });
  fs.writeFileSync('db.json', JSON.stringify(result));
  return result;
}