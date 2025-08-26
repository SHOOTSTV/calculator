let num1 = 0;
let num2 = 0;
let operator = "";

const calculatorDisplay = document.querySelector(".calculator-display");
const numberButtons = document.querySelectorAll(".number");
let displayContent = calculatorDisplay.innerText;

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
  return a / b;
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      console.log(add(num1, num2));
      break;
    case "-":
      console.log(subtract(num1, num2));
      break;
    case "*":
      console.log(multiply(num1, num2));
      break;
    case "/":
      console.log(divide(num1, num2));
      break;
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculatorScreen.innerText = button.innerText;
  });
});
