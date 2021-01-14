require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('./services/auth/passport');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
// POSTS:
app.use('/posts', postsRoutes);
// USERS:
app.use('/users', usersRoutes);

// Default error handler:
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

app.listen(process.env.PORT, () => {
  console.log(`App server started on ${process.env.PORT}!`);
});
