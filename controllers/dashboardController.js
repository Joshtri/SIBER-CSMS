// Fungsi untuk menampilkan halaman dashboard
exports.dashboardPage = (req, res) => {
  // Pastikan userData ada di dalam sesi sebelum melanjutkan
  if (!req.session.userData) {
    return res.redirect('/login-pertamina');
  }

  // Dapatkan informasi user dari sesi
  const { userId, username } = req.session.userData;

  // Render halaman dashboard dengan informasi user
  res.render('dashboardAdmin', { userId, username });
};

exports.berandaWebPage = (req, res) => {
  const berandaTitle = "Beranda | SIBER Pertamina Limau Field"; // Gantilah dengan data atau variabel yang sesuai

  res.render("index", {
    berandaTitle,
  });
};