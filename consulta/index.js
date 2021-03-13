const express = require ('express');
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
  LembreteCriado: (lembrete) => {
    baseConsulta[lembrete.contador] = lembrete;
  },
  ObservacaoCriada: (observacao) => {
    const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || [];
    observacoes.push(observacao);
    baseConsulta[observacao.lembreteId]['observacoes'] = observacoes;
  }
};

app.post("/eventos", (req, res) => {
  const evento = req.body;
  funcoes[evento.tipo](req.body.dados);
  res.status(200).send(baseConsulta);
  // if (evento.tipo === EventoCriado)
  //   tratarEventoLembrete;
  // else if (evento.tipo === ObservacaoCriada)
  //   tratarEventoObservacao;
});



app.get("/lembretes", (req, res) => {
  res.status(200).send(baseConsulta);
});



app.listen(6000, () => console.log ("Consultas. Porta 6000"));