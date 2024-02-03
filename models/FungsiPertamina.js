const mongoose = require('mongoose');

// Skema (Schema)
const FungsiPertaminaSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Menjamin bahwa setiap username bersifat unik
  },
  password: {
    type: String,
    required: true,
  },
});

// Model
const FungsiPertamina = mongoose.model('Fungsi_pertamina', FungsiPertaminaSchema);
module.exports = FungsiPertamina;
