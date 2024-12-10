const buttons = document.querySelectorAll("button");
const display = document.querySelector(".calculator-display");

let buttonPressed = "";
let entries = [];
let calculationEntry = "";
let decimal = false;
let operator = false;
let operatorDivideMultiply = false;
let equals = false;
let operatorCount = 0;
let hasNumber = false;

document.querySelector(".calculator-buttons").addEventListener("click", (e) => {
  buttonPressed = e.target.textContent;
  buttonPress(buttonPressed);
});

function buttonPress(button) {
  if (display.value.length >= 15 && buttonPressed !== "C") {
    display.scrollTop = display.scrollHeight;
  }

  if (button > 0 && button <= 9) {
    hasNumber = true;
    display.value += button;
    calculationEntry += button;
  }

  if (buttonPressed === "0") {
    buttonZero();
  }

  if (button === "C") {
    clearAll();
  }

  if (button === ".") {
    buttonDecimal();
  }

  if (button === "X" || button === "/" || button === "+" || button === "-") {
    if (operator === false) {
      operator = true;
    }

    buttonOperator(button);
  }

  if (button === "=") {
    display.value = evaluateExpression(calculationEntry);
    calculationEntry = "";
  }

  if (button === "") {
    console.log("remove");
    calculationEntry = calculationEntry.slice(0, -1);
    display.value = calculationEntry;
  }
}

function calculate() {}

function clearAll() {
  calculationEntry = "";
  decimal = false;
  operator = false;
  operatorDivideMultiply = false;
  operatorCount = 0;
  display.value = "";
  hasNumber = false;
}

function buttonZero() {
  if (calculationEntry !== "0") {
    calculationEntry += buttonPressed;
    display.value += buttonPressed;
  } else if (hasNumber === true) {
    calculationEntry += buttonPressed;
  }
}

function buttonDecimal() {
  const numbers = calculationEntry.split(/[\+\-\X\/]/);
    const currentNumber = numbers[numbers.length - 1];
    
    // Check if the current number already contains a decimal
    if (!currentNumber.includes('.')) {
        calculationEntry += '.';
        display.value += '.';
    }
    return;
}

// this section handles what happens when an operator is pressed.

function buttonOperator(button) {
  switch (button) {
    case "X":
      checkOperator(button);
      break;
    case "/":
      checkOperator(button);
      break;
    case "+":
      checkOperator(button);
      break;
    case "-":
      checkOperator(button);
      break;
  }
}

function multiply() {
  if (operatorDivideMultiply === false) {
    operatorDivideMultiply = true;
  }
}

function divide() {
  if (operatorDivideMultiply === false) {
    operatorDivideMultiply = true;
  }
}

function checkOperator(button) {
  if (!display) {
    return;
  }

  if (
    calculationEntry.slice(-1) === "X" ||
    calculationEntry.slice(-1) === "/" ||
    calculationEntry.slice(-1) === "+" ||
    calculationEntry.slice(-1) === "-"
  ) {
    return;
  }

  calculationEntry += button;

  display.value = calculationEntry;
}

function evaluateExpression(expression) {
  // Remove all whitespace
  expression = expression.replace(/\s+/g, "");

  // Split into tokens (numbers and operators)
  const tokens = expression.match(/(\d*\.?\d+|[+\-X/])/g);
  if (!tokens) return 0;

  // First pass: handle multiplication and division
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "X" || tokens[i] === "/") {
      const prev = parseFloat(tokens[i - 1]);
      const next = parseFloat(tokens[i + 1]);
      let result;

      if (tokens[i] === "X") {
        result = prev * next;
      } else {
        if (next === 0) throw new Error("Division by zero");
        result = prev / next;
      }

      // Replace the three tokens (number, operator, number) with the result
      tokens.splice(i - 1, 3, result.toString());
      i--;
    }
    i++;
  }

  // Second pass: handle addition and subtraction
  let result = parseFloat(tokens[0]);
  for (i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const number = parseFloat(tokens[i + 1]);

    if (operator === "+") {
      result += number;
    } else if (operator === "-") {
      result -= number;
    }
  }

  return result;
}
