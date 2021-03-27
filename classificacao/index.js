const express = require ('express');
const app = express();
app.use(express.json());
const axios = require('axios')
const palavraChave = 'importante';
const funcoes = {
  ObservacaoCriada: (observacao) => {
    console.log('obs: ' + observacao)
    observacao.status = observacao.texto.includes (palavraChave) ? 'importante' : 'comum';
    console.log(observacao.status)
    axios.post('http://localhost:10000/eventos', {
      tipo: "ObservacaoClassificada",
      dados: observacao
    })
  }
};



app.post('/eventos', (req, res) => {
  console.log('tipo: ' + req.body.tipo)
  try{
    funcoes[req.body.tipo](req.body.dados);
  }catch (err){
    //console.log('tipo: ' + req.body.tipo)
  }
  res.status(200).send({msg: 'ok'});
});

app.listen (7000, () => console.log ('Classificação. Porta 7000.'));

