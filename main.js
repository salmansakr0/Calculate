// Get Elements
let toggleElement = document.querySelector(".themes__toggle");
let clacResult = document.querySelector(".calc__result_num");
let calcKeys = document.querySelectorAll("[data-type]");
let calcHistoryCurrent = document.querySelector(".calc__history span.current");
let calcHistoryOperat = document.querySelector(".calc__history span.operat");
let calcHistoryStored = document.querySelector(".calc__history span.stored");



// Light/Dark Theme Function
let toggleFun = _ => toggleElement.classList.toggle("themes__toggle--isActive");
// Light/Dark Theme Event
toggleElement.addEventListener("click", toggleFun);
toggleElement.addEventListener("keydown", (e) => e.key === "Enter" ? toggleFun() : false);

// Main Logic For App

// -> Add Numbers To Ui
let storedNumber = "";
let currentNumber = "";
let operation = "";
const updateUi = (value) => clacResult.innerText = value;

// Add Numbers Function
const numberButtenHandler = (input) =>{
    let value = typeof input === 'string' ? input : input.dataset.value;
    // Dot Condition
    if(value === "." && currentNumber.includes(".")) return;
    // Zero Condition
    if(value === "0" && !currentNumber) return;

    currentNumber += value;
    updateUi(currentNumber);
    calcHistoryCurrent.innerText = currentNumber;
    historyUpdate()
}

// Reset Function
const resetFun = _ =>{
    currentNumber = "";
    storedNumber = "";
    operation = "";
    calcHistoryCurrent.innerHTML = ""
    calcHistoryStored.innerHTML = ""
    calcHistoryOperat.innerHTML = "";
    updateUi(clacResult.innerHTML = "0");
    historyUpdate()
}

// Delete Function
const deleteFun = _ =>{
    if(!currentNumber || currentNumber === "0") return;
    if(currentNumber.length === 1){
        currentNumber = "";
        updateUi(clacResult.innerHTML = "0");
        historyUpdate()
    } else{
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        updateUi(currentNumber);
        historyUpdate()
    }
}

// Operations Function
const executeOperation = _ =>{
    if(currentNumber && storedNumber && operation){
        switch(operation){
            case "+":
                storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
                break;
            case "*":
                storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
                break;
            case "-":
                storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
                break;
            case "/":
                storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
                break;
        }
        currentNumber = "";
        updateUi(storedNumber);
        historyUpdate()
    }
}

// Equal Button Function
const operationButtonHandler = (operationValue) =>{
    if(!currentNumber && !storedNumber) return;
    if(currentNumber && !storedNumber){
        storedNumber = currentNumber;
        currentNumber = "";
        operation = operationValue;
    } else if(storedNumber){
        operation = operationValue;
        if(currentNumber) executeOperation();
    }
    historyUpdate()
}

// History Update Function
const historyUpdate = _ =>{
    if(currentNumber && !storedNumber) return;
    if(currentNumber && !storedNumber) calcHistoryCurrent.innerHTML = currentNumber;
    if (currentNumber && storedNumber){
        calcHistoryStored.innerHTML = currentNumber;
        calcHistoryCurrent.innerHTML = storedNumber;
    }
    if(operation) calcHistoryOperat.innerHTML = operation;
}

calcKeys.forEach((element) => {
    element.addEventListener("click", _ =>{
        const caclType = element.dataset.type;
        const calcValue = element.dataset.value;
        if(caclType === "number"){
            numberButtenHandler(element);
        } else if(caclType === "operation"){
            switch (calcValue){
                case "c":
                    resetFun();
                    break;
                case "Backspace":
                    deleteFun();
                    break;
                case "Enter":
                    executeOperation();
                    break;
                default:
                    operationButtonHandler(calcValue);
            }
        }
    });
});

// Use Keyboard In Application
const availableNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const availableOperations = ["+", "-", "*", "/"];

window.addEventListener("keydown", function(e){
    if(availableNums.includes(e.key)){
        numberButtenHandler(e.key);
    } else if(availableOperations.includes(e.key)){
        operationButtonHandler(e.key);
    } else if(e.key === "Backspace"){
        deleteFun();
    } else if(e.key === "Enter"){
        executeOperation();
    }
});