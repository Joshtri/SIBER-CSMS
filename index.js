require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const session = require ('express-session')
const redis = require('redis')
const RedisStore = require("connect-redis").default
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const client = redis.createClient({
  password: process.env.REDIS_PASS,
  socket: { 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});
(async () => { await client.connect(); })()


const connectDB = require('./utils/dbConfig');
const app = express();
const PORT = process.env.PORT;

  

// import router in app.js
const routerBeranda = require('./router/dashboard');
const routerMitra = require('./router/mitra');
const routerLogin = require('./router/login');
const routerHSEPlan = require("./router/hseplan");


// Express Session
app.use(
  session({
    proxy: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'SiberCSMS',
    store: new RedisStore({ 
      client: client,
      ttl: 3600, // waktu kadaluwarsa dalam detik (misalnya 1 jam)
    
    
    }),
  
    
  })
);


app.use(cors({ credentials: true, origin: '*' }))
connectDB();

app.use(morgan('tiny'));


// Middleware untuk menguraikan JSON dalam body permintaan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routerBeranda, routerMitra, routerLogin, routerHSEPlan );

// app.use("/", routerMitra)

// Menyediakan rute statis untuk file PDF di direktori 'uploads'
app.use('/data/detail-hse/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data/detail-psb/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data/detail-pb/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data/detail-pa/uploads', express.static(path.join(__dirname, 'uploads')));
app.set("view engine", "ejs");


app.set("views", [
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/detail"),
    path.join(__dirname, "/views/data"),
    path.join(__dirname, "/views/updates"),
  ]);


//menampilkan assets.
app.use(express.static(__dirname + "/public"));

app.listen(PORT,() =>{
    console.log(`run on port  <http://localhost>:${PORT}`);
}); 