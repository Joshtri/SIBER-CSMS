const bcrypt = require('bcrypt');
const FungsiPertamina = require('../models/FungsiPertamina');



//get view create pin page.
exports.createPINPage = (req, res) => {
    res.render("createPIN");  
  };
  

// Fungsi untuk membuat PIN pertamina-divisi di MongoDB
exports.CreatingPIN = async (req, res) => {
    try {
      // Variabel untuk input data PIN
      const password = req.body.password;
  
      // Generate salt untuk hashing PIN
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
  
      // Mengenkripsi PIN menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Membuat instance model FungsiPertamina dengan data yang dienkripsi
      const fungsiPertaminaInstance = new FungsiPertamina({
        username: req.body.username, // Pastikan username tersedia dalam request body
        password: hashedPassword,
      });
  
      // Menyimpan instance model ke MongoDB
      await fungsiPertaminaInstance.save();
  
      res.send(
        `${hashedPassword} <br> Buat PIN success. <br><a href="/TEBNiTYQrFFULHqFQluEuw==">Kembali</a>`
      );
    } catch (error) {
      console.error("Registration error:", error);
      res.send("Registration failed");
    }
};

//get view login Pertamina
exports.loginPertaminaPage = (req, res) => {
    res.render("loginPertamina", {
      notifyStatusLogin : false
    });
  };

  exports.CheckingPIN = async (req, res) => {
    const { password } = req.body;
    let notifyStatusLogin = false;
  
    const passwordUsernameMap = {
      '8642097531': 'ICT',
      '3210987654': 'HSSE',
      '2468013579': 'WIWS',
      '1098765432': 'RAM',
      '5678901234': 'PE',
      '8765432109': 'PRODUKSI',
      '5432109876': 'SCM',
      // Tambahkan lebih banyak pasangan password dan username jika diperlukan
    };
  
    const username = passwordUsernameMap[password];
  
    if (!username) {
      notifyStatusLogin = true;
      res.render('loginPertamina', { notifyStatusLogin });
      return;
    }
  
    try {
      // Melakukan pencarian user berdasarkan username
      const user = await FungsiPertamina.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const hashedPasswordFromDatabase = user.password;
      const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);
  
      if (passwordMatch) {
        req.session.userData = {
          userId: user.userId,
          username: user.username,
        };
  
        res.redirect('/dashboard-pertamina');
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  

exports.logOutAccount = (req,res)=>{
    // Hapus data pengguna dari sesi
    
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login-pertamina');
      }
    });
  }