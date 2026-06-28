const currDisplay = document.querySelector(".curr-display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");

let currentOperand = "";
let previousOperand = "";
let operation = null;

// Append number to current display
function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand += number;
  updateDisplay();
}

// Choose operation
function chooseOperation(op) {
  if (currentOperand === "") return;

  if (previousOperand !== "") {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  updateDisplay();
}

// Update both displays
function updateDisplay() {
  currDisplay.innerText = currentOperand;
  prevDisplay.innerText = operation ? `${previousOperand} ${operation}` : "";
}

// Clear all
function clearDisplay() {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  updateDisplay();
}

// Delete last character
function deleteChar() {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
}

// Compute result
function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Error" : prev / curr;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = null;
  previousOperand = "";
  updateDisplay();
}


// Event listeners
numbers.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.innerText));
});

operands.forEach((btn) => {
  btn.addEventListener("click", () => chooseOperation(btn.innerText));
});

equalBtn.addEventListener("click", () => {
  compute();
});

clearBtn.addEventListener("click", clearDisplay);
delBtn.addEventListener("click", deleteChar);