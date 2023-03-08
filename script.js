// Define the size of the array
const n = 20;

// Initialize an empty array
const array = [];

// Get the speed range input element
const speedRange = document.getElementById("speed-range");


// Call the initialization function to fill the array with random values and show the bars
init();

// Function to fill the array with random values
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars();
}

// Function to sort and animate the bars
function play() {
  // Create a copy of the original array
  const copy = [...array];
  // Sort the copy using bubble sort and get the list of moves made
  const moves = bubbleSort(copy);
  // Animate the moves
  animate(moves);
}

// Function to animate the sorting process
function animate(moves) {
  // If there are no more moves to make, show the final result
  if (moves.length == 0) {
    showBars();
    return;
  }
  // Get the next move to make
  const move = moves.shift();
  const [i, j] = move.indices;
  // If the move is a swap, swap the values in the array
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  // Show the bars with the current move highlighted
  showBars(move);
  // Get the delay time from the speed range input
  const delayTime = 1000 - speedRange.value;
  // Wait for the delay time before making the next move
  setTimeout(function () {
    animate(moves);
  }, delayTime);
}
// Function to perform bubble sort and generate the list of moves made
function bubbleSort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      // Add a comparison move to the list
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        // If the values are out of order, add a swap move to the list and swap the values in the array
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  // Return the list of moves made
  return moves;
}

// Function to display the bars representing the values in the array
function showBars(move) {
  // Clear the container
  container.innerHTML = "";
  // Loop through the array and create a bar for each value
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    // If a move is provided and the current index is involved in the move, highlight the bar
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    // Add the bar to the container
    container.appendChild(bar);
  }
}
