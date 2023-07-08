const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    const resultado = findStartOfPacketMarker(data);
    console.log(resultado);
});


// --- Primera parte ---
function findStartOfPacketMarker(datastream) {
  for (let i = 3; i < datastream.length; i++) {
    if (new Set(datastream.substring(i - 3, i + 1)).size === 4) {
      return i + 1;
    }
  }
  return -1; // Devolver -1 si no se encuentra ningún marcador
}