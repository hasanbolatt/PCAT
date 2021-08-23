const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

const app = express();

//Connect to DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine 
app.set("view engine","ejs");

//Middleware response ile request arasındaki oluşan olaylar bütünü
//Middleware fonksiyonu 
//Middlewarelar sırayla çalışır
//İlgili middleware fonksiyonunu yazarak public klasörümüzü uygulamamıza kaydedelim.
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());    

//routes
app.get('/', (req, res) => {
  
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('index');
})

app.get('/about', (req, res) => {
  
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('about');
})

app.get('/add', (req, res) => {
  
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('add');
})

app.post('/photos', async(req, res) => {
  
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  await Photo.create(req.body);
  res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
