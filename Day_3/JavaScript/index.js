const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    const rucksacks = data.split('\n');
    
    const totalPriorities = calculateTotalPriorities(rucksacks);
    const totalGroup = calculateTotalGroup(rucksacks);

    console.log(totalPriorities);
    console.log(totalGroup);
  });


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
  


// --- Primera parte ---
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


// --- Segunda parte ---
function getPriority(character) {
  return uppercasePriorities[character] || lowercasePriorities[character];
}

function findCommonCharacter(lines) {
  const [line1, line2, line3] = lines;
  const commonCharacters = [];

  for (let char of line1) {
    if (line2.includes(char)) {
      commonCharacters.push(char);
    }
  }

  for (let char of commonCharacters) {
    if (line3.includes(char)) {
      return getPriority(char);
    }
  }

  return 0;
}

function calculateTotalGroup(rucksacks) {
  let totalPriorities = 0;

  const result = rucksacks.map((str) => str.trim());
  for (let i = 0; i < result.length; i += 3) {
    totalPriorities += findCommonCharacter(result.slice(i, i + 3));
  }
  return totalPriorities;
}