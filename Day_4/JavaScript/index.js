const fs = require('fs-extra');

fs.readFile('file_input.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    const rucksacks = data.split('\n');
    
    const result = countContainedPairs(rucksacks);
    console.log(result);
});


// -- Primera parte --
function isContained(range1, range2) {
  const [start1, end1] = range1;
  const [start2, end2] = range2;
  return start1 <= start2 && end1 >= end2;
}

function countContainedPairs(assignmentPairs) {
  let count = 0;
  for (const pair of assignmentPairs) {
    const [range1, range2] = pair.split(",");  // Split the pair into two ranges
    const parsedRange1 = range1.split("-").map(Number);  // Convert range1 to an array of numbers
    const parsedRange2 = range2.split("-").map(Number);  // Convert range2 to an array of numbers
    if (isContained(parsedRange1, parsedRange2) || isContained(parsedRange2, parsedRange1)) {
      count++;
    }
  }
  return count;
}


// -- Segunda parte --