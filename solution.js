import fs from "fs";
// constant for the size of a bingo board
const BOARD_SIZE = 5;

// Read the contents of the "input.txt" file, convert it to a string, and split it into an array using line breaks ("\r\n").
const inputArray = fs.readFileSync("./input.txt").toString().split("\r\n");

// Create an array of the 'drawnNumbers' by splitting the first element of the inputArray (comma-separated values) and converting them to numbers.
const drawnNumbers = inputArray[0].split(",").map(Number);

let numberOrder = [];
// Iterate through 'drawnNumbers' and store the index of each number of drawnNumbers in 'numberOrder' at the index of number.
drawnNumbers.forEach((number, i) => {
  numberOrder[number] = i;
});

// Initialize empty arrays of the first and last completed bingo boards
let firstCompletedBoard = [];
let lastCompletedBoard = [];
// Initialize 'fastBingoIndex' and 'slowBingoIndex' with extreme initial values, those representing the indexes of the fastest and slowest bingo winning numbers
let fastBingoIndex = Number.MAX_SAFE_INTEGER;
let slowBingoIndex = Number.MIN_SAFE_INTEGER;

//* Necessary Functions
// Function to read a board starting from a given index in the inputArray and returning a 2D array consisting of the lines/rows in the board
const readBoard = (startIndex) => {
  let currentBoard = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    // Read a row from inputArray, trim whitespaces, split by whitespace, and convert to integers.
    currentBoard[i] = inputArray[startIndex + i]
      .trim()
      .split(/\s+/)
      .map((elem) => parseInt(elem));
  }

  // console.log("Current board", currentBoard);
  return currentBoard;
};

// Function to calculate when a board hits bingo by finding the index of the bingo ball number that is.
const findBoardBingoIndex = (board) => {
  // Create boardBingoTimes by mapping each element in board to its time of being drawn according to numberOrder.
  let boardBingoTimes = board.map((row) =>
    row.map((column) => (column = numberOrder[column]))
  );

  let boardBingoIndex = Number.MAX_SAFE_INTEGER;

  // Function to find the maximum value in an array and update 'boardBingoIndex' if the maximum value is smaller.
  const findMaxValue = (array) => {
    let max = Math.max(...array);

    if (max < boardBingoIndex) {
      boardBingoIndex = max;
    }
  };

  //check rows for the highest value
  boardBingoTimes.forEach((row) => {
    findMaxValue(row);
  });

  //check columns for the highest value
  for (let i = 0; i < BOARD_SIZE; i++) {
    findMaxValue(boardBingoTimes.map((row) => row[i]));
  }
  // Return the calculated index of bingo winning number in drawnNumbers.
  return boardBingoIndex;
};

// Function to calculate the sum of all unmarked numbers in a board and multiply it by the last drawn number
const calculateFinalScore = (board, bingodIndex) => {
  //console.log("board", board);

  // Flatten the array by one level
  let flattenedBoard = board.flatMap((row) => row);
  //console.log("flattenedBoard: ", flattenedBoard);

  // Calculate the sum of unmarked numbers in the board based on numberOrder and bingoIndex.
  let unmarkedSum = flattenedBoard.reduce(
    (prev, curr) => (numberOrder[curr] > bingodIndex ? prev + curr : prev),
    0
  );

  let lastDrawnNumber = parseInt(drawnNumbers[bingodIndex]);

  return unmarkedSum * lastDrawnNumber;
};

// Loop through inputArray and read all bingo Boards
for (let index = 2; index < inputArray.length; index += BOARD_SIZE + 1) {
  let currentBoard = readBoard(index);

  let bingoIndex = findBoardBingoIndex(currentBoard);

  // Update fastBingoIndex and firstCompletedBoard if bingoIndex is smaller.
  if (bingoIndex < fastBingoIndex) {
    fastBingoIndex = bingoIndex;
    firstCompletedBoard = currentBoard;
  }
  // Update slowBingoIndex and lastCompletedBoard if bingoIndex is larger.
  if (bingoIndex > slowBingoIndex) {
    slowBingoIndex = bingoIndex;
    lastCompletedBoard = currentBoard;
  }
}

// Calculate the results for the 'firstCompletedBoard' and 'lastCompletedBoard'.
let firstBingoResult = calculateFinalScore(firstCompletedBoard, fastBingoIndex);
let lastBingoResult = calculateFinalScore(lastCompletedBoard, slowBingoIndex);

console.log(`Drawn numbers from first to last: `, ...drawnNumbers);
console.log(`************`);
console.log(`First completed board: ${firstCompletedBoard}`);
console.log(`Number of drawn balls: ${fastBingoIndex + 1}`);
console.log(`Last drawn number: ${drawnNumbers[fastBingoIndex]}`);
console.log(`Result: ${firstBingoResult}`);
console.log(`============`);
console.log(`Last completed board: ${lastCompletedBoard}`);
console.log(`Number of drawn balls: ${slowBingoIndex + 1}`);
console.log(`Last drawn number: ${drawnNumbers[slowBingoIndex]}`);
console.log(`Result: ${lastBingoResult}`);
