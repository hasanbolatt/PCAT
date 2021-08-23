const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//Veri ekleme
/*Photo.create({
  title: 'Photo title 3',
  description: 'Photo 3 description',
});*/

//veri okuma
/*Photo.find({},(err,data)=>{
    console.log(data);
});*/

const id = '612354604058f323c462d6e6';

//Veri güncelleme
/*Photo.findByIdAndUpdate(
    id,{
        title:'Yenilenmiş başlık 1',
        description:'Yenilenmiş tanım 1'
    },
    {
        //yenilenen veriyi de görmek için
        new:true
    },
    (err,data) =>{
        console.log(data);
    }
);*/

//veri silme
Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Veri silindi..');
});
