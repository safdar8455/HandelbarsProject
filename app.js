const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port= 80;


main().then(()=>{console.log('connection sucessfull.......')}).catch(err => console.log(err));

const travelFormSchema= new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }, 
  location: { type: String, required: true },
  guests: { type: Number, required: true },
  arrivals: { type: Date, required: true, default: Date.now },
  leaving: { type: Date, required: true }
});

const TravelForm = mongoose.model('TravelForm', travelFormSchema);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/safdarCart');
}

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.status(200).render('index')
});

app.post('/',(req, res)=>{
  Name = req.body.name
  Email = req.body.email
  Phone = req.body.phone
  Address = req.body.address
  LLocation = req.body.location
  Guests = req.body.guests
  Arrivals = req.body.arrivals
  Leaving = req.body.leaving

  TravelForm({
          name: Name,
          email: Email,
          phone: Phone,
          address: Address, 
          location: LLocation,
          guests: Guests,
          arrivals: Arrivals,
          leaving: Leaving
  }).save();
  res.status(200).render('index.hbs')
});

app.listen(port, ()=>{
  console.log(`this server is running at port ${port}`)
});