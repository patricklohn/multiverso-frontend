// Seleção de Elemetos 

const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector("#generated-password");

//Novas Funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password"); 
const generatePasswordContainer = document.querySelector("#generate-options");
const lettersInput = document.querySelector("#letters"); 
const numberInput = document.querySelector("#numbers"); 
const symbolsInput = document.querySelector("#symbols"); 
const lengthInput = document.querySelector("#length"); 
const copyPassword = document.querySelector("#copy-password"); 

// Fuções 
// Letras, Números e Símbolos
const getLetterLowerCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26)+ 97);

}

const getLetterUpperCase =() => {

    return String.fromCharCode(Math.floor(Math.random() * 26)+ 65);

}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () =>{
    const symbols = "(){}=<>/_-$#@!%[]&";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) =>{

    let password = ""

    // Segunda versão

    const passwordLength = +lengthInput.value;

    const generators = []
    if(lettersInput.checked){
        generators.push(getLetterUpperCase,getLetterLowerCase);
    }
    if(numberInput.checked){
        generators.push(getNumber)
    }
    if(symbolsInput.checked){
        generators.push(getSymbol)
    }
    if(generators.length === 0){
        return;
    }

    for(i = 0; i< passwordLength; i = i + generators.length){
        generators.forEach(()=>{
            const randomValue = generators[Math.floor(Math.random() * generators.length)]()

            password += randomValue;
        }); 
    }
    password = password.slice(0, passwordLength); 

    generatePasswordElement.style.display = "block";
    generatePasswordElement.querySelector("h4").innerText = password;
};

//Eventos 
generatePasswordButton.addEventListener("click",()=>{
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
})

openCloseGeneratorButton.addEventListener("click",() => {
    generatePasswordContainer.classList.toggle("hide");
})

copyPassword.addEventListener("click", (e)=>{
    e.preventDefault()

    const password = generatePasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(()=>{
        copyPassword.innerText = "Seha copiada com sucesso!"

        setTimeout(()=>{
            copyPassword.innerText = "Copiar"
        },2000)
    })
})

