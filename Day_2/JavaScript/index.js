const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
  
    const score = calculateTotalScore(data);
    console.log('El puntaje total es:', score);
  });


function calculateTotalScore(input) {
  const lines = input.trim().split('\n');
  let totalScore = 0;

  for (let i = 0; i < lines.length; i++) {
    const [opponentMove, playerMove] = lines[i].split(' ');
    const conteo = {
      'X': 1,
      'Y': 2,
      'Z': 3
    }; 
    
    let roundScore = 0;
    if (opponentMove === 'A') {
      if (playerMove === 'X') {
        roundScore = 3 + conteo.X;
      } else if (playerMove === 'Y') {
        roundScore = 6 + conteo.Y;
      } else {
        roundScore = 0 + conteo.Z;
      }
    } else if (opponentMove === 'B') {
      if (playerMove === 'X') {
        roundScore = 0 + conteo.X;
      } else if (playerMove === 'Y') {
        roundScore = 3 + conteo.Y;
      } else {
        roundScore = 6 + conteo.Z;
      }
    } else if (opponentMove === 'C') {
      if (playerMove === 'X') {
        roundScore = 6 + conteo.X;
      } else if (playerMove === 'Y') {
        roundScore = 0 + conteo.Y;
      } else {
        roundScore = 3 + conteo.Z;
      }
    }

    totalScore += roundScore;
  }

  return totalScore;
};