const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('List Ok');
});

router.get('/:id', (req, res) => {
    console.log('DB from app', req.app.db);
    console.log('DB from request', req.user);
    res.json({
        db: req.app.db,
        user: req.user
    });
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