const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    const result = findStartOfPacketMarker(data);
    const result2 = findStartOfMessageMarker(data);

    console.log(result);
    console.log(result2);
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


// --- Segunda parte ---
function findStartOfMessageMarker(datastream) {
  for (let i = 13; i < datastream.length; i++) {
    if (new Set(datastream.substring(i - 13, i + 1)).size === 14) {
      return i + 1;
    }
  }
  return -1;
}
