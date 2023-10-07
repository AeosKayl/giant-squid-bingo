import fs from "fs";
// constant for the size of a bingo board
const BOARD_SIZE = 5;

// Read the contents of the "input.txt" file, convert it to a string, and split it into an array using line breaks ("\r\n").
const inputArray = fs.readFileSync("./test.txt").toString().split("\r\n");
console.log(inputArray);

// Create an array of the 'drawnNumbers' by splitting the first element of the inputArray (comma-separated values) and converting them to numbers.
const drawnNumbers = inputArray[0].split(",").map(Number);
console.log(drawnNumbers);

let numberOrder = [];
// Iterate through 'drawnNumbers' and store the index of each number of drawnNumbers in 'numberOrder' at the index of number.
drawnNumbers.forEach((number, i) => {
  numberOrder[number] = i;
});

console.log(numberOrder);

// Initialize empty arrays of the first and last completed bingo boards
let firstCompletedBoard = [];
let lastCompletedBoard = [];
// Initialize 'fastBingoIndex' and 'slowBingoIndex' with extreme initial values, those representing the indexes of the fastest and slowest bingo winning numbers
let fastBingoIndex = Number.MAX_SAFE_INTEGER;
let slowBingoIndex = Number.MIN_SAFE_INTEGER;
