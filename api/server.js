require('dotenv').config();

const express = require('express');
const app = express();

// POSTS: (Create Read Update Delete)
app.get('/posts', function(req, res) {
    //@TODO: Posts list retrieve
});
app.get('/posts/:id', function(req, res) {
    //@TODO: Get single post
});
app.post('/posts', function(req, res) {
    //@TODO: Create new post
});
app.put('/posts/:id', function(req, res) {
    //@TODO: Update existing post
});
app.delete('/posts/:id', function(req, res) {
    //@TODO: Delete specified post
});


app.listen(process.env.PORT, () => {
    console.log(`App server started on ${process.env.PORT}!`);
});