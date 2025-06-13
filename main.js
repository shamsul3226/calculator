/*document.addEventListener('DOMContentLoaded', () => {
}   );*/

const display = document.getElementById("display");

function percentage() {
  if (display.value) {
    display.value = parseFloat(display.value) / 100;
  }
}

function clearHistory() {
  display.value = "";
}

function clearDisplayAll() {
  display.value = "";
}

function clearDisplayLast() {
  display.value = display.value.slice(0, -1);
}

function reciprocal() {
  if (display.value) {
    display.value = 1 / parseFloat(display.value);
  }
}

function square() {
  if (display.value) {
    display.value = Math.pow(parseFloat(display.value), 2);
  }
}

function squareRoot() {
  if (display.value) {
    display.value = Math.sqrt(parseFloat(display.value));
  }
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function appendToDisplay(value) {
  display.value += value;
}

function multiplication() {
  appendToDisplay("*");
}

function subtraction() {
  appendToDisplay("-");
}

function addition() {
  appendToDisplay("+");
}

function division() {
  appendToDisplay("/");
}

function decimal() {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
}

function changePositiveNegative() {
  if (display.value) {
    display.value = -parseFloat(display.value);
  }
}

// Event listeners for keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    appendToDisplay(key); // If the key is a number, add it to display
  } else if (key === "+") {
    addition();
  } else if (key === "-") {
    subtraction();
  } else if (key === "*") {
    multiplication();
  } else if (key === "/") {
    division();
  } else if (key === "=" || key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    clearDisplayLast();
  } else if (key === "Escape") {
    clearDisplayAll();
  }
});
