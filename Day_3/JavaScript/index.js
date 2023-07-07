const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    const rucksacks = data.split('\n');
    
    const totalPriorities = calculateTotalPriorities(rucksacks);
    console.log(totalPriorities);
  });


// --- Primera parte ---
const lowercasePriorities = {};
const uppercasePriorities = {};

// Crear objeto lowercasePriorities de forma dinámica
let lowercasePrioritiesArray = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97));
lowercasePrioritiesArray.reduce((obj, char, index) => {
  obj[char] = index + 1;
  return obj;
}, lowercasePriorities);

// Crear objeto uppercasePriorities de forma dinámica
let uppercasePrioritiesArray = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
uppercasePrioritiesArray.reduce((obj, char, index) => {
  obj[char] = index + 27;
  return obj;
}, uppercasePriorities);

function getPriority(character) {
  if (lowercasePriorities.hasOwnProperty(character)) {
    return lowercasePriorities[character];
  } else if (uppercasePriorities.hasOwnProperty(character)) {
    return uppercasePriorities[character];
  }
  return 0; // Prioridad por defecto si no se encuentra el carácter
}

function calculateTotalPriorities(rucksacks) {
  let total = 0;

  for (let rucksack of rucksacks) {
    const compartment1 = rucksack.substring(0, rucksack.length / 2);
    const compartment2 = rucksack.substring(rucksack.length / 2);

    for (let item of compartment1) {
      if (compartment2.includes(item)) {
        total += getPriority(item);
        break;
      }
    }
  }

  return total;
};


