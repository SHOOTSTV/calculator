const calculatorDisplay = document.querySelector(".calculator-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.getElementById("equal");
const clearButton = document.querySelector(".clear");

let currentValue = "0";
let previousValue = null;
let selectedOperator = null;
let shouldOverwrite = true;

function updateDisplay() {
  calculatorDisplay.textContent = currentValue;
}

function inputDigit(digit) {
  // prevents double .
  if (digit === "." && currentValue.includes(".")) return;

  // overwrite the display if true otherwise continue displaying digits
  if (shouldOverwrite) {
    currentValue = digit === "." ? "0." : digit;
    shouldOverwrite = false;
    return;
  }

  // prevents 0 from stacking ex: 0003
  if (currentValue === "0" && digit !== ".") {
    currentValue = digit;
    return;
  }

  currentValue += digit;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

function operate(num1, num2, operatorSymbol) {
  switch (operatorSymbol) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return num2;
  }
}

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    inputDigit(btn.textContent);
    updateDisplay();
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const newOperator = btn.textContent;

    // If user presses an operator after entering the second number,
    // evaluate the existing pair first (single-pair evaluation),
    // then set up for the next operation with the new operator.
    if (selectedOperator && previousValue !== null && !shouldOverwrite) {
      const prev = parseFloat(previousValue);
      const curr = parseFloat(currentValue);

      const result = operate(prev, curr, selectedOperator);
      currentValue = result.toString();
      updateDisplay();

      // Prepare for chaining: use result as the first operand
      previousValue = currentValue;
      selectedOperator = newOperator;
      shouldOverwrite = true;
      return;
    }

    // If the user presses operators consecutively, just update the operator
    if (shouldOverwrite) {
      selectedOperator = newOperator;
      return;
    }

    // First operator after entering a number
    previousValue = currentValue;
    selectedOperator = newOperator;
    shouldOverwrite = true;
  });
});

equalButton.addEventListener("click", () => {
  if (!selectedOperator || !previousValue) return;

  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  let result = operate(prev, curr, selectedOperator);

  currentValue = result.toString();
  selectedOperator = null;
  previousValue = null;
  shouldOverwrite = true;
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  currentValue = "0";
  previousValue = null;
  selectedOperator = null;
  shouldOverwrite = true; // on repart à zéro
  updateDisplay();
});

// Initialize display
updateDisplay();
