const express = require('express');
const ejs = require('ejs');2
const path = require('path');

const app = express();

//template engine 
app.set("view engine","ejs");

//Middleware response ile request arasındaki oluşan olaylar bütünü
//Middleware fonksiyonu 
//Middlewarelar sırayla çalışır
//İlgili middleware fonksiyonunu yazarak public klasörümüzü uygulamamıza kaydedelim.
app.use(express.static('public'))    

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

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
