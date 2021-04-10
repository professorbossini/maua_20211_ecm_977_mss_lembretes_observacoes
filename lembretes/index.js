const express = require ('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
const lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
  res.send(lembretes);
});

app.put('/lembretes', async (req, res) => {
  contador++;
  const { texto } = req.body;
  lembretes[contador] = {contador, texto};
  await axios.post ("http://192.168.1.161:10000/eventos", {
    tipo: "LembreteCriado",
    dados: {contador, texto}
  });
  res.status(201).send(lembretes[contador]);
});

app.post ('/eventos', (req, res) => {
  try{
    console.log(req.body);
  }catch(err){}
  res.status(200).send({msg: "ok"});
})

app.listen(4000, () => {
  console.log('Microsserviços de lembretes em funcionamento. Porta 4000.');
});

