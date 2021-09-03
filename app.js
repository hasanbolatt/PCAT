const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

//Connect to DB
mongoose
  .connect('mongodb://localhost/pcat-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
    //console.log('Veri tabanı bağlantısı başarılı..');
  })
  .then(() => {
    console.log('Veri tabanı bağlantısı başarılı');
  });

//template engine
app.set('view engine', 'ejs');

//Middleware response ile request arasındaki oluşan olaylar bütünü
//Middleware fonksiyonu
//Middlewarelar sırayla çalışır
//İlgili middleware fonksiyonunu yazarak public klasörümüzü uygulamamıza kaydedelim.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  //res.render('about');

  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('about');
});

app.get('/add', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('add');
});

app.post('/photos', async (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  //console.log(req.files.image);
  //await Photo.create(req.body);
  //res.redirect('/');

  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let imagePath = __dirname + '/public/uploads/' + uploadeImage.name;
  
  uploadeImage.mv(imagePath,async () =>{
    await Photo.create({
      ...req.body,
    image:'/uploads/' + uploadeImage.name
    })
    res.redirect('/');
  });

});

app.delete('/photos/:id',async(req,res)=>{
  const photo = await Photo.findOne({_id: req.params.id});
  const deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  
  await Photo.findByIdAndRemove(req.params.id);

  res.redirect('/');
})

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()

  res.redirect(`/photos/${req.params.id}`)
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
