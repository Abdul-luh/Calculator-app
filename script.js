class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand =
      this.currentOperand.toString() + operation.toString();
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (previous === NaN || current === NaN) return;
    // if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;

      case "-":
        computation = previous - current;
        break;

      case "*":
        computation = previous * current;
        break;

      case "/":
        computation = previous / current;
        break;

      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousOperand;
    // console.log(this.previousOperand);
    // console.log(this.currentOperand);
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equals]");
const previousOperandElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
