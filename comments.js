// Create web server and listen on port 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsFile = path.join(__dirname, 'comments.json');
var comments = [];

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    comments = JSON.parse(data);
    res.json(comments);
  });
});

app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(comments);
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
```
You can run the server with the following command:
```
$ node comments.js
```
The server will listen on port 3000. You can now use the following AJAX code to send the comments to the server:
```javascript
// Path: public/index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Comment Box</title>
  </head>
  <body>
    <div id="content"></div>
    <form id="commentForm">
      <input type="text" placeholder="Your name" name="author" />
      <input type="text" placeholder="Say something..." name="text" />
      <input type="submit" value="Post" />
    </form>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script>
      function getComments() {
        $.ajax({
          url: '/comments',
          type: 'GET',
          success: function(data) {
            var html = '';
            data.forEach(function(comment) {
              html += '<div><strong>' + comment.author + '</strong>: ' + comment.text + '</div>';
            });
            $('#content').html(html);
          }
        });
      }

      function postComment(e) {
        e.preventDefault();
        var comment = {