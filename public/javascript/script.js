class Calculator {
    constructor(previousOperatorText, currentOperatorText) {
        this.previousOperatorText = previousOperatorText
        this.currentOperatorText = currentOperatorText
        this.clear() // clear inputs to defaults when calc created
    }

        clear() { // clear func defined
            this.currentOperator = ''
            this.previousOperator = ''
            this.operation = undefined
        }

        delete() {
            this.currentOperator = this.currentOperator.toString().slice(0, -1) // slice of last digit
        }

        appendNumber(number) {
            if (number == '.' && this.currentOperator.includes('.')) return
            this.currentOperator = this.currentOperator.toString() + number.toString()
        }

        chooseOperation(operation) {
            if (this.currentOperator == '') return
            if (this.previousOperator != '') {
                this.compute()
            }
            this.operation = operation
            this.previousOperator = this.currentOperator
            this.currentOperator = ''
        }

        compute() {
            let computation
            const prev = parseFloat(this.previousOperator)
            const current = parseFloat(this.currentOperator)
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case '+':
                    computation = prev + current
                    break
                case '-':
                    computation = prev - current
                    break
                case '*':
                    computation = prev * current
                    break
                case '÷':
                    computation = prev / current
                    break
                default:
                    return
            }
            this.currentOperator = computation
            this.operation = undefined
            this.previousOperator = ''
        }

        updateDisplay() {
            this.currentOperatorText.innerText = this.currentOperator
            this.previousOperatorText.innerText = this.previousOperator
            if (this.operation != null) {
                this.previousOperatorText.innerText = `${this.previousOperator} ${this.operation}`
            }
        }

} // class

const numberButtons = document.querySelectorAll('[number]');
const operatorButtons = document.querySelectorAll('[operator]')
const equalsButton = document.querySelector('[equals]')
const allClearButton = document.querySelector('[all-clear]')
const deleteButton = document.querySelector('[delete]')
const previousOperatorText = document.querySelector('[previous-operator]')
const currentOperatorText = document.querySelector('[current-operator]')

const calculator = new Calculator(previousOperatorText, currentOperatorText)

numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
}) 

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
}) 

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})