const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
  
    const calorias = data.split('\n');

    const caloriasMaximas = calcularCaloriasMaximas(calorias);
    const TresElfosPrincipales = calcularTresElfosPrincipales(calorias);

    console.log("El Elfo que lleva la mayor cantidad de calorías lleva un total de:", caloriasMaximas);
    console.log('Total de calorías de los tres Elfos principales:', TresElfosPrincipales);
  });


// --- Primera parte ---
function calcularCaloriasMaximas(calorias) {
  let caloriasElfos = [];
  let caloriasElfoActual = 0;
  
  for (let i = 0; i < calorias.length; i++) {
    const linea = calorias[i].trim();
    if (linea === "") {
      caloriasElfos.push(caloriasElfoActual);
      caloriasElfoActual = 0;
    } else {
      caloriasElfoActual += parseInt(linea);
    }
  }

  caloriasElfos.push(caloriasElfoActual);

  const maxCalorias = Math.max(...caloriasElfos);
  return maxCalorias;
};

// --- Segunda parte ---
function calcularTresElfosPrincipales(calorias) {
  let caloriasElfos = [];
  let caloriasElfoActual = 0;
  
  for (let i = 0; i < calorias.length; i++) {
    const linea = calorias[i].trim();
    if (linea === "") {
      caloriasElfos.push(caloriasElfoActual);
      caloriasElfoActual = 0;
    } else {
      caloriasElfoActual += parseInt(linea);
    }
  }
  
  const topTresElfos = caloriasElfos
    .sort((a, b) => b - a) // Ordena en orden descendente
    .slice(0, 3); // Toma los tres primeros elementos

  const totalCalorias = topTresElfos.reduce((sum, caloria) => sum + caloria, 0);  
  return totalCalorias;
};