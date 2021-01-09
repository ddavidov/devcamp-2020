const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(await db.select().from('users').orderBy('id DESC'));
});

router.get('/:id', (req, res) => {
  res.send('Single record Ok');
});

router.post('/', (req, res) => {
  res.send('Create Ok');
});

router.put('/:id', (req, res) => {
  res.send('Update Ok');
});

router.delete('/:id', (req, res) => {
  res.send('Delete Ok');
});

module.exports = router;
