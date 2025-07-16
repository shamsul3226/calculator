document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const historyDiv = document.getElementById("historyList");
  let currentInput = "0";
  let operator = null;
  let operand = null;
  let history = [];
  let justEvaluated = false;

  function updateDisplay() {
    if (operator && operand !== null) {
      display.value =
        currentInput === ""
          ? `${operand} ${operator}` // display only operand + operator
          : `${operand} ${operator} ${currentInput}`; // full expression
    } else {
      display.value = currentInput;
    }
  }

  function addToHistory(entry) {
    history.push(entry);
    historyDiv.innerHTML = history.map((item) => `<div>${item}</div>`).join("");
  }

  function clearHistory() {
    history = [];
    historyDiv.innerHTML = "";
  }

  function clearAll() {
    currentInput = "0";
    operator = null;
    operand = null;
    updateDisplay();
  }

  function clearLast() {
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = "0";
    }
    updateDisplay();
  }

  function inputDigit(digit) {
    if (justEvaluated) {
      currentInput = digit; // Reset current input after evaluation
      justEvaluated = false;
    } else if (currentInput === "0") {
      if (digit === "0") {
        return; // Ignore additional leading zeros
      } else {
        currentInput = digit; // Replace leading zero
      }
    } else {
      currentInput += digit; // Append digit
    }
    updateDisplay();
  }

  function inputDecimal() {
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
    updateDisplay();
  }

  function inputOperator(op) {
    if (operator && operand !== null) {
      calculate();
    }
    operator = op;
    operand = parseFloat(currentInput);
    currentInput = ""; // Reset current input for next number
    updateDisplay();
  }

  function calculate() {
    let result = operand;
    const inputValue = parseFloat(currentInput.replace(/[^\d.-]/g, ""));

    switch (operator) {
      case "+":
        result += inputValue;
        break;
      case "-":
        result -= inputValue;
        break;
      case "×":
        result *= inputValue;
        break;
      case "÷":
        result = inputValue === 0 ? "Error" : result / inputValue;
        break;
      default:
        return;
    }
    addToHistory(`${operand} ${operator} ${inputValue} = ${result}`);
    currentInput = result.toString();
    operator = null;
    operand = null;
    justEvaluated = true; // Mark that the last action was an evaluation
    updateDisplay();
  }

  function handleSpecialOperator(op) {
    let value = parseFloat(currentInput);
    let result;
    switch (op) {
      case "%":
        result = value / 100;
        break;
      case "√":
        result = value < 0 ? "Error" : Math.sqrt(value);
        break;
      case "x²":
        result = value * value;
        break;
      case "1/x":
        result = value === 0 ? "Error" : 1 / value;
        break;
      default:
        return;
    }
    addToHistory(`${op}(${value}) = ${result}`);
    currentInput = result.toString();
    updateDisplay();
  }

  function toggleSign() {
    if (currentInput !== "0") {
      currentInput = currentInput.startsWith("-")
        ? currentInput.slice(1)
        : "-" + currentInput;
      updateDisplay();
    }
  }

  document.querySelector(".buttons").addEventListener("click", (e) => {
    if (!e.target.classList.contains("button")) return;
    const id = e.target.id;
    if (id >= "0" && id <= "9") {
      inputDigit(id);
    } else if (id === "decimal") {
      inputDecimal();
    } else if (id === "clear") {
      clearAll();
    } else if (id === "clearLast") {
      clearLast();
    } else if (id === "clearHistory") {
      clearHistory();
    } else if (id === "add") {
      inputOperator("+");
    } else if (id === "subtract") {
      inputOperator("-");
    } else if (id === "multiply") {
      inputOperator("×");
    } else if (id === "divide") {
      inputOperator("÷");
    } else if (id === "equals") {
      if (operator && operand !== null) calculate();
    } else if (id === "percent") {
      handleSpecialOperator("%");
    } else if (id === "sqrt") {
      handleSpecialOperator("√");
    } else if (id === "square") {
      handleSpecialOperator("x²");
    } else if (id === "reciprocal") {
      handleSpecialOperator("1/x");
    } else if (id === "positiveNegative") {
      toggleSign();
    }
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key >= "0" && key <= "9") {
      inputDigit(key);
    } else if (key === ".") {
      inputDecimal();
    } else if (key === "Escape") {
      clearAll();
    } else if (key === "Backspace") {
      clearLast();
    } else if (key === "+") {
      inputOperator("+");
    } else if (key === "-") {
      inputOperator("-");
    } else if (key === "*") {
      inputOperator("×");
    } else if (key === "/") {
      inputOperator("÷");
    } else if (key === "=" || key === "Enter") {
      if (operator && operand !== null) calculate();
    } else if (key === "%") {
      handleSpecialOperator("%");
    } else if (key === "r" || key === "R") {
      handleSpecialOperator("√");
    } else if (key === "s" || key === "S") {
      handleSpecialOperator("x²");
    } else if (key === "i" || key === "I") {
      handleSpecialOperator("1/x");
    } else if (key === "n" || key === "N") {
      toggleSign();
    }
  });

  updateDisplay();

// Update the year in the footer
  const yearSpan = document.getElementById("year");
      yearSpan.textContent = new Date().getFullYear();

});
