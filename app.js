const express = require('express');
const path = require('path');

const app = express();

//Middleware response ile request arasındaki oluşan olaylar bütünü
//Middleware fonksiyonu 
//Middlewarelar sırayla çalışır

//İlgili middleware fonksiyonunu yazarak public klasörümüzü uygulamamıza kaydedelim.
app.use(express.static('public'))    

app.get('/', (req, res) => {
  
  res.sendFile(path.resolve(__dirname,'temp/index.html'));
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
