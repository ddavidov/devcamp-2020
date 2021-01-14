const router = require('express').Router();
const checkAuth = require('../middleware/acl').checkAuthorized;

router.get('/', [checkAuth, (req, res) => {
  res.send('List');
}]);

router.get('/:id', (req, res) => {
  res.send('Single record');
});

router.post('/', (req, res) => {
  res.send('New value: ');
});

router.put('/:id', (req, res) => {
  res.send('Update Ok');
});

router.delete('/:id', (req, res) => {
  res.send('Delete Ok');
});

module.exports = router;
