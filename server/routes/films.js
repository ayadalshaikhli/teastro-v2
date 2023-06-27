const express = require('express');
const router = express.Router();

const Film = require('../models/Film');


router.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        res.send(films);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.get('/:filmId', async (req, res) => {
    try {
        const film = await Film.findById(req.params.filmId);
        res.send(film);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;