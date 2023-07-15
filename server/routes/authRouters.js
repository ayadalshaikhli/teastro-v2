const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser} = require('../controllers/authController');


router.use(
    cors({
        origin:"http://localhost:5001",
        credentials: true,
    }
));

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
