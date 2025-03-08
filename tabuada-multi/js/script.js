// Seleção de elementos
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number")
const inputMultiplication = document.querySelector("#multiplicator")
const multiplicationTable = document.querySelector("#multiplication-operations")
const titleSpan = document.querySelector("span");

// funções
const createTable = (number, multiplicationNumber) => {

    multiplicationTable.innerHTML = "";


    for(let i=1; i<= multiplicationNumber; i++){
        const result = number * i;
        const template = `<div class="row">
            <div class="operation">${number} x ${i} =</div>
            <div class="result">${result}</div>
            <div>`;

        const parser = new DOMParser();

        const htmlTemplate = parser.parseFromString(template,"text/html")

        const row = htmlTemplate.querySelector(".row");

        multiplicationTable.appendChild(row);
    }

    titleSpan.innerText = number;

}

//eventos
multiplicationForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const multiplicationNumber = +numberInput.value;

    const multiplicatorNumber = +inputMultiplication.value;

    if(!multiplicationNumber || !multiplicatorNumber) return;

    createTable(multiplicationNumber, multiplicatorNumber);
})