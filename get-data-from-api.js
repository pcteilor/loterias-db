
const fs = require('fs');
const axios = require('axios');


const tracos = "==============================================";

// APIs URLs
const URLAPI = 'https://loteriascaixa-api.herokuapp.com/api/';

// const APIAllMega = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena';
// const APIlatest = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena/latest';

// ----------------------------------------------------------------------------------
// Funções
// ----------------------------------------------------------------------------------

// -------------------------------------------
// Funções herdadas - Não usadas mais
// -------------------------------------------

// Função que salva ultimo resultado da Mega-sena - Antiga
const latestMega = async () => {
  console.log('Carregando último sorteio...');
   axios.get(APIlatest)
   .then((res) => {
       const datalatestMega = JSON.stringify(res.data, null, 2);
         fs.writeFile('latestMega.json', datalatestMega, (err) => {
           if (err) throw err;
           console.log('Último sorteio salvo!');
         })
   })  
};
// Função que salva todos os resultados da Mega-sena e trata os dados - Antiga
const allMega = async () => {
  console.log('Carregando resultados...');
  axios.get(APIAllMega)
  .then((res) => {
      const dataAllMega = JSON.stringify(res.data, null, 2);
        fs.writeFile('src/json/allMega.json', dataAllMega, (err) => {
          if (err) throw err;
          console.log('Resultados salvos!');
        })
        console.log('Separando últimos 10 resultados...');
        const lastTen = res.data.slice(0, 9);
         fs.writeFile('src/json/lastTenMega.json', JSON.stringify(lastTen, null, 2), (err) => {
          if (err) throw err;
          console.log('Últimos 10 resultados salvos!');
        })
  })  
};

// -------------------------------------------
// Funções Ativas
// -------------------------------------------

// Função geral para montar arquivos
const writeData = async (data, fileName, local) => {
    console.log('Iniciando processo writeData...');
    const dataAsync = await data;
    fs.writeFile(`${local}${fileName}`, dataAsync, (err) => {
      if (err) throw err;
      console.log(`[writeData] Arquivo ${fileName} salvo!`);
    })
  }
// Função generica para puxar dados
const getData = async (url, spacer = 2) => {
  console.log('Iniciando processo getData...');
  const data = await axios.get(url);
  console.log('[getData] Get...')
  const dataJson = JSON.stringify(data.data, null, spacer);
  console.log('[getData] Json...')
  return dataJson;
}
// Função que cria o arquivo de todas as loterias disponiveis na API
const getGeral = async () => {
  console.log('Carregando nomes loterias...');
  const loterias = await axios.get(`${URLAPI}`);
  const loteriasJson = JSON.stringify(loterias.data, null, 2);
  console.log(loteriasJson);
  const fileLoterias = fs.writeFile('loterias.json', loteriasJson)
}
// Função que salva todos os resultados de uma loteria especifica
const getAllData = async () => {
  console.log(tracos);
  console.log('Iniciando processo getAllData...');
  console.log(tracos);
  const loterias = require('./loterias.json');
  loterias.map(lot => {
    const url = `${URLAPI}${lot}`; 
    console.log(`Carregando ${lot}...`);
    getData(url)
    .then((data) => {
      console.log('Gravando arquivos...');
      fs.writeFile(`./data/${lot}.json`, data, (err) => {
        if (err) throw err;
        console.log(`${lot} salvo!`);
      })
      fs.stat(`./data/${lot}.json`, (err, stats) => {
        if (err) throw err;
        console.log(tracos);
        console.log(`${lot} possui ` + convertBytes(stats.size));
        console.log(tracos);
      })
    })
  })
}

//Converte Bytes em MB
const convertBytes = function(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  if (bytes == 0) {
    return "n/a"
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  if (i == 0) {
    return bytes + " " + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}



// ----------------------------------------------------------------------------------
// Executando as funções
// ----------------------------------------------------------------------------------

console.log(tracos);
console.log('Iniciando...');
console.log(tracos);

getAllData();



