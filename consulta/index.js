const express = require ('express');
const axios = require('axios');
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
  },
  ObservacaoAtualizada: (observacao) => {
    const observacoes = baseConsulta[observacao.lembreteId]['observacoes'];
    const indice = observacoes.findIndex (o => o.id === observacao.id);
    observacoes[indice] = observacao;
  }
};

app.post("/eventos", (req, res) => {
  console.log ('chegou evento', req.body);
  try{
    const evento = req.body;
    funcoes[evento.tipo](req.body.dados);
  }
  catch (err){}
  res.status(200).send(baseConsulta);
  // if (evento.tipo === EventoCriado)
  //   tratarEventoLembrete;
  // else if (evento.tipo === ObservacaoCriada)
  //   tratarEventoObservacao;
});



app.get("/lembretes", (req, res) => {
  res.status(200).send(baseConsulta);
});



app.listen(6000, async () => {
  console.log("Consultas. Porta 6000");
  const resp = await axios.get('http://192.168.1.161:10000/eventos');
  resp.data.forEach((valor, indice, colecao) => {
    try{
      funcoes[valor.tipo](valor.dados);
    }catch(err){}
  })
});