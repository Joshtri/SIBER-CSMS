const express = require('express');
const router = express.Router();

const { postFormHSEPlan } = require('../controllers/hsePlanController');

const {uploadMultiplePDF} = require('../utils/multer');

// router.get('/TEBNiTYQrFFULHqFQluEuw==', createPINPage);


router.post('/postHSEPlan',uploadMultiplePDF ,postFormHSEPlan);


module.exports = router;
