var buttons = document.getElementsByClassName("button");
var input = document.getElementById("input");

// display.textContent = 0;
var operand1 = 0;
var operand2 = null;
var operator = null;

function isOperator(value) {
  return value == "+" || value == "-" || value == "*" || value == "/";
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var value = this.getAttribute("data-value");
    var text = input.textContent.trim();

    if (isOperator(value)) {
      operator = value;
      operand1 = parseFloat(text);
      input.textContent = "";
    } else if (value == "ac") {
      input.textContent = "";
    } else if (value == "sign") {
      operand1 = parseFloat(text);
      operand1 = -1 * operand1;
      input.textContent = operand1;
    } else if (value == ".") {
      if (text.length && !text.includes(".")) {
        input.textContent = text + ".";
      }
    } else if (value == "%") {
      operand1 = parseFloat(text);
      operand1 = operand1 / 100;
      input.textContent = operand1;
    } else if (value == "=") {
      operand2 = parseFloat(text);
      var result = eval(operand1 + " " + operator + " " + operand2);
      if (result) {
        input.textContent = result;
        operand1 = result;
        operand2 = null;
        operator = null;
      }
    } else {
      input.textContent += value;
    }
  });
}
