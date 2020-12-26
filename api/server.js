require('dotenv').config();

const express = require('express');
const app = express();

const postsRoutes = require('./routes/posts');

app.db = 'some DB connection';
//app.resolve = function(depName) {return };

app.use((req, res, next) => {
    const user = 'Vasya';
    req.user = user;
    next();
});

// POSTS:
app.use('/posts', postsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App server started on ${process.env.PORT}!`);
});