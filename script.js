const add = (a, b) => Number(a) + Number(b);

const subtract = (a, b) => Number(a) - Number(b);

const divide = (a, b) => Number(a) / Number(b);

const multiply = (a, b) => Number(a) * Number(b);

const operate = (numOne, operator, numTwo) => {
    if (operator === '+') {
        return add(numOne, numTwo);
    }
    else if (operator === '-') {
        return subtract(numOne, numTwo);
    }
    else if (operator === '/') {
        return divide(numOne, numTwo);
    }
    else if (operator === '*') {
        return multiply(numOne, numTwo);
    }
}

const numbersButton = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const negativeButton = document.querySelector('.neg');
const equalsButton = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const percentButton = document.querySelector('.percent');
const historyDisplay = document.querySelector('.history');
const currentDisplay = document.querySelector('.current-entry');

let addingNums = true;
let equalsSwitch = false;
let firstValue;
let secondValue;
let total;
let temp;
let currentOperator;
let decimalClicked = false;
let lastPressed;


numbersButton.forEach((number) => {
    number.addEventListener('click', (e) => {

        if (!addingNums) {
            currentDisplay.textContent = '';
        }
        if (equalsSwitch) {
            firstValue = '';
            total = '';
            temp = '';
            equalsSwitch = false;
        }
        addingNums = true;
        currentDisplay.textContent += e.target.textContent;

        temp = currentDisplay.textContent;
        console.log(temp);
    });
});

decimalButton.addEventListener('click', (e) => {
    if (!decimalClicked) {
        if (!addingNums) {
            currentDisplay.textContent = '';
        }
        decimalClicked = true;
        addingNums = true;
        currentDisplay.textContent += e.target.textContent;
        temp = currentDisplay.textContent;
    }
})

clear.addEventListener('click', (e) => {
    currentDisplay.textContent = '';
    firstValue = '';
    secondValue = '';
    total = '';
    currentOperator = '';
    temp = '';
    historyDisplay.textContent = '';
    addingNums = true;
    decimalClicked = false;
})

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {

        if (!currentOperator) {
            if (equalsSwitch) {
                equalsSwitch = false;
            }
            addingNums = false;
            if (total) {
                firstValue = total;
            }
            else {
                firstValue = temp;
            }
            temp = '';
            currentOperator = event.target.value;
            decimalClicked = false;
            historyDisplay.textContent = `${firstValue}`;
        }
        else if (currentOperator) {
            addingNums = false;
            secondValue = temp;
            firstValue = operate(firstValue, currentOperator, secondValue);
            currentDisplay = event.target.value;
            secondValue = '';
            decimalClicked = false;
            historyDisplay.textContent = `${firstValue}`;
        }
    })
});

equalsButton.addEventListener('click', (e) => {
    if (firstValue) {
        equalsSwitch = true;
        addingNums = false;
        secondValue = temp;

        total = operate(firstValue, currentOperator, secondValue);

        historyDisplay.textContent = secondValue;
        currentDisplay.textContent = total;

        currentOperator = '';
        secondValue = '';
        decimalClicked = false;
        console.log(`total: ${total} currentOperator: ${currentOperator}`);
    }
});

percentButton.addEventListener('click', (e) => {
    // addingNums = false;
    // equalsSwitch = true;
    // decimalClicked = false;
    currentDisplay.textContent /= 100;

    temp = currentDisplay.textContent;
    console.log(temp);
})

negativeButton.addEventListener('click', (e) => {
    currentDisplay.textContent *= -1;

    temp = currentDisplay.textContent;
    console.log(temp);
})

// fix negative to disable button if no value is entered

deleteButton.addEventListener('click', (e) => {
    currentDisplay.textContent = currentDisplay.textContent
        .toString()
        .slice(0, -1)
})

function exceedsDisplay() {
    if (currentDisplay.length >= 8 || rawData.length >= 45) {
        warning.textContent = `The numbers have reached the limit of the display.`
        return true;
    } else {
        return false;
    }
}

function adjustByLength() {
    // changes font-size dynamically based on length of string
    if (currentDisplay.innerText.length > 10) {
        if (!currentDisplay.classList.contains("small")) {
            currentDisplay.classList.add("small");
        }
    } else {
        currentDisplay.classList.remove("small");
    }

    if (historyDisplay.innerText.length > 20) {
        if (!historyDisplay.classList.contains("st-small")) {
            historyDisplay.classList.add("st-small");
        }
    } else {
        historyDisplay.classList.remove("st-small");
    }

    if (historyDisplay.innerText.length > 32) {
        alert("Input is too long!!");
        firstValue = "";
        operators = "";
        secondValue = "";
        historyDisplay.innerText = "0";
    }
}

function formatDisplay(value) {
    // remove trailing decimal points
    if (operators && firstValue.endsWith(".")) {
        firstValue = firstValue.slice(0, -1);
    }

    historyDisplay.innerText = `${firstValue} ${operators
        .replace("*", "x")
        .replace("/", "÷")} ${secondValue}`;
    lastPressed = value;

    // remove trailing decimals on enter press
    if (lastPressed == "equals" && historyDisplay.innerText.endsWith(".")) {
        historyDisplay.innerText = historyDisplay.innerText.slice(0, -1);
    }
}

// keypress listeners
// window.addEventListener("keypress", (event) => {
//     if (Number.isInteger(+event.key)) {
//         onButtonPress(event.key);
//     } else {
//         switch (event.key) {
//             case ".":
//                 onButtonPress("decimal");
//                 break;
//             case "Enter":
//                 onButtonPress("equals");
//                 break;
//             case "=":
//                 onButtonPress("equals");
//                 break;
//             case "/":
//                 onButtonPress("/");
//                 break;
//             case "*":
//                 onButtonPress("*");
//                 break;
//             case "+":
//                 onButtonPress("+");
//                 break;
//             case "-":
//                 onButtonPress("-");
//                 break;
//             case "Delete":
//                 onButtonPress("delete");
//                 break;
//         }
//     }
// });