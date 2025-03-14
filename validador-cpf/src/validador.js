const confirmacao = document.querySelector("#confirmacao")
const recusado = document.querySelector("#recusado")
const aprovado = document.querySelector("#aprovado")
const cpf = document.querySelector("#cpf");
const cpfVerficar = document.querySelector("#VerificarCpf");

function validarCpf(arr){ 
    const multiArr = [];
    const maisArr = [];
    let somaArr = 0;
    let somaMais = 0; 
    let temporDigitOne = 11;
    let temporDigitTwo = 12;

    for (let j = 0; j < 9; j++){
        let contadorNegative = temporDigitOne - 1; 
        let multi = arr[j] * contadorNegative;
        somaArr += multi;
        multiArr.push(multi);

        temporDigitOne = contadorNegative; 

    }
        
    for (let i = 0; i < 10; i++){
        let contadorNegative = temporDigitTwo - 1;
        let somaMaisI = arr[i] * contadorNegative;
        somaMais += somaMaisI; 
        maisArr.push(somaMais);
        
        temporDigitTwo = contadorNegative; 
    }

    let valorSomaMulti = (somaArr * 10) % 11;
    let digitoVerificado1 = 0;
    let valorSomaMais = (somaMais * 10) % 11;
    let digitoVerificado2 = 0; 

    if(valorSomaMulti === 10){
        digitoVerificado1 = 0; 
    }else{
        digitoVerificado1 = valorSomaMulti; 
    }

    if(valorSomaMais === 11){
        digitoVerificado2 = 0; 
    }else{
        digitoVerificado2 = valorSomaMais; 
    }

    if(digitoVerificado1 === arr[9] && digitoVerificado2 === arr[10]){
        console.log(`Cpf é Valido`)
        confirmacao.classList.toggle('none')
        confirmacao.classList.add('green')
        aprovado.classList.toggle('none')
    }else{
        console.log(`O Cpf não é valido`)
        confirmacao.classList.toggle('none')
        confirmacao.classList.add('red')
        recusado.classList.toggle('none')
    }
}

function verificaCpf(date){

    if(date.length === 14 ){
        let newCpf = date.replace(/\D+/g, '')
        console.log(newCpf)
        const arrayCpfString = newCpf.split('');
        const arrayCpfNumber = arrayCpfString.map(Number);
        validarCpf(arrayCpfNumber)

    }else{
        console.log(`Seu ${date} esta mal informado.`)
    }
}

cpfVerficar.addEventListener('click', (e) =>{
    e.preventDefault();
    confirmacao.classList.add('none')
    confirmacao.classList.remove('red')
    confirmacao.classList.remove('green')
    aprovado.classList.add('none')
    recusado.classList.add('none')
    verificaCpf(cpf.value);
})

