// Create a web server that listens on port 3000. It should respond to a GET request to /comments with an array of comments. Each comment should have an id, author, and message property. The id should be unique and increment by 1 for each new comment. Use the comments array below to get started.

const express = require('express');
const app = express();

const comments = [
  { id: 1, author: 'John', message: 'Hello everyone' },
  { id: 2, author: 'Jane', message: 'How is everyone doing?' },
  { id: 3, author: 'Bob', message: 'I am doing well' }
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});