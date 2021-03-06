const express = require('express');
const bodyParser = require ('body-parser');
const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const app = express();
app.use(bodyParser.json());

const observacoesPorLembreteId = {};

//localhost:5000/lembretes/123456/observacoes
app.put('/lembretes/:id/observacoes', async (req, res) => {
  const idObs = uuidv4();
  const { texto } = req.body;
  const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
  observacoesDoLembrete.push({
    id: idObs,
    texto
  });
  observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "ObservacaoCriada",
    dados: {
      id: idObs,
      texto,
      lembreteId: req.params.id
    }
  });
  res.status(201).send(observacoesDoLembrete);
})

app.get( '/lembretes/:id/observacoes', (req, res) => {
  res.send(observacoesPorLembreteId[req.params.id] || []);
})

app.listen(5000, () => {
  console.log('Microsserviço de observações em execução. Porta 5000.');
})