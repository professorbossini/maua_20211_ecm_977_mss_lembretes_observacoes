const express = require ('express');
//const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(express.json());

const eventos = [];


app.post('/eventos', (req, res) => {
  const evento = req.body;
  eventos.push(evento);
  //console.log(evento);
  axios.post("http://192.168.1.161:4000/eventos", evento);
  axios.post("http://192.168.1.161:5000/eventos", evento);
  axios.post("http://192.168.1.161:7000/eventos", evento);
  res.status(200).json({msg: 'ok'});
});

app.get('/eventos', (req, res) => {
  res.send(eventos);
})

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000"));