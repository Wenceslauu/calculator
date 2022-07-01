const display = document.querySelector('.display')

let result = 0
let operatorQueued = 'start'
let chained = false

populateDisplay()

inputOperators()

clear()

function populateDisplay() {
    const digitBtns = document.querySelectorAll('.digit')

    digitBtns.forEach(digitBtn => {
        digitBtn.addEventListener('click', () => {
            if (operatorQueued === 'end') { // Handles numbers display after an equals sign
                result = 0
                display.textContent = 0
                operatorQueued = 'start'
            } 
            else if (chained) { // Handles numbers display after chained operations
                display.textContent = 0
                chained = false
            }

            display.textContent = `${+digitBtn.textContent + (10 * +display.textContent)}`
        })
    })
}

function inputOperators() {
    const operatorBtns = document.querySelectorAll('.operator')
    const equalsBtn = document.querySelector('#equals')

    operatorBtns.forEach(operatorBtn => {
        operatorBtn.addEventListener('click', e => {
            if (result === 0) { // Handles operations at the start of an expression or after an equals sign, followed by another number.
                result += +display.textContent 
                display.textContent = 0
                operatorQueued = e.target.id
            } else if (operatorQueued === 'end') { // Handles imediate operations after an equals sign
                display.textContent = 0
                operatorQueued = e.target.id 
            } else { // Handles operators acting as equals signs as well as chained operations
                result = operate(operatorQueued, result, +display.textContent)
                display.textContent = result
                operatorQueued = e.target.id
                chained = true
            }
        })
    })

    equalsBtn.addEventListener('click', () => {
        if (operatorQueued !== 'start' && operatorQueued !== 'end') {
            result = operate(operatorQueued, result, +display.textContent)
            display.textContent = result

            operatorQueued = 'end'
        }
    })
}

function clear() {
    const clearBtn = document.querySelector('#clear')
    clearBtn.addEventListener('click', () => {
        result = 0
        display.textContent = 0
    })
}

function add(numA, numB) {
    return numA + numB
}

function subtract(numA, numB) {
    return numA - numB
}

function multiply(numA, numB) {
    return numA * numB
}

function divide(numA, numB) {
    if (numB === 0) {
        return "Don't divide by zero"
    }

    result = numA / numB

    return Math.round(result * 10) / 10
}

function operate(operator, numA, numB) {
    switch(operator) {
        case 'add':
            return add(numA, numB)
        case 'subtract':
            return subtract(numA, numB)
        case 'multiply':
            return multiply(numA, numB)
        case 'divide':
            return divide(numA, numB)
        default:
            return "Something bad happened"
    }
}

