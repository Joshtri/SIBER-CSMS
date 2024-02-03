// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKViPpb-J-kj8Wzp8qkhf-9e89NEuLOwk",
    authDomain: "sibercsms-limau.firebaseapp.com",
    projectId: "sibercsms-limau",
    storageBucket: "sibercsms-limau.appspot.com",
    messagingSenderId: "548279737729",
    appId: "1:548279737729:web:e6cb4e3817d97afc01dc80",
    measurementId: "G-LFCQQBXPSG"
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = {
  auth
}