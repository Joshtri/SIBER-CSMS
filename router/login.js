const express = require('express');
const router = express.Router();

const { createPINPage,CreatingPIN, CheckingPIN, loginPertaminaPage, logOutAccount} = require('../controllers/loginController');



router.get('/TEBNiTYQrFFULHqFQluEuw==', createPINPage);
router.post('/createPIN', CreatingPIN);
router.post('/postLogin', CheckingPIN);

//router-login fungsi.
router.get('/login-pertamina', loginPertaminaPage);

//router logout
router.get('/logout', logOutAccount);
module.exports = router;
