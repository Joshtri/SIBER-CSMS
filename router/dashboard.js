const express = require('express');
const router = express.Router();

// const berandaController = require('../controllers/berandaController');
// const mitraController = require("../controllers/mitraController");

const {isLoggedIn} = require('../auth/protect');
const { dashboardPage, berandaWebPage } = require('../controllers/dashboardController');

/*
    *Catatan*

        *Terdapat 2 beranda yaitu admin (user dari pertamina) &  Pengunjung umum.
        *form Login Pertamina masuk saja di router beranda.
    
    *Alasan*✅ ✅ 
    karena bagian tersebut masih dalam ruang lingkup public / pengunjung umum. 


*/
const requireAuth = (req, res, next) => {
    // Pastikan userData ada di dalam sesi sebelum melanjutkan
    if (!req.session.userData) {
        return res.redirect('/login');
    }

    // Dapatkan informasi ID dan username dari sesi
    const { userId, username } = req.session.userData;

    // Cetak informasi ke konsol
    console.log('ID Pengguna:', userId);
    console.log('Username Pengguna:', username);

    next();
};

//router-beranda pengunjung umum
router.get('/', berandaWebPage);

//router-beranda admin.
router.get('/dashboard-pertamina',requireAuth , dashboardPage);







module.exports = router;