const confirmacao = document.querySelector("#confirmacao")
const recusado = document.querySelector("#recusado")
const aprovado = document.querySelector("#aprovado")
const cpf = document.querySelector("#cpf");
const cpfVerficar = document.querySelector("#VerificarCpf");

// Formatação correta do CPF: xxx.xxx.xxx-xx
function formatarCpf(value) {
    value = value.replace(/\D/g, ""); // Remove tudo que não for número

    if (value.length > 11) {
        value = value.slice(0, 11); // Garante que tenha no máximo 11 dígitos
    }

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

document.addEventListener("DOMContentLoaded", () => {
    cpf.addEventListener("input", (e) => {
        e.target.value = formatarCpf(e.target.value);
    });

    cpf.addEventListener("paste", (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        e.target.value = formatarCpf(pasteData);
    });
});

// Função para validar CPF
function validarCpf(arr) { 
    if (arr.length !== 11) {
        console.log("CPF inválido: número incorreto de dígitos.");
        return false;
    }

    // Elimina CPFs inválidos conhecidos
    const invalidos = [
        "00000000000", "11111111111", "22222222222", "33333333333",
        "44444444444", "55555555555", "66666666666", "77777777777",
        "88888888888", "99999999999"
    ];

    if (invalidos.includes(arr.join(""))) {
        console.log("CPF inválido: sequência repetida.");
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += arr[i] * (10 - i);
    }
    let primeiroDigito = (soma * 10) % 11;
    primeiroDigito = primeiroDigito === 10 ? 0 : primeiroDigito;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += arr[i] * (11 - i);
    }
    let segundoDigito = (soma * 10) % 11;
    segundoDigito = segundoDigito === 10 ? 0 : segundoDigito;

    if (arr[9] === primeiroDigito && arr[10] === segundoDigito) {
        console.log(`CPF é válido!`);
        confirmacao.classList.remove('none', 'red');
        confirmacao.classList.add('green');
        aprovado.classList.remove('none');
        return true;
    } else {
        console.log(`CPF inválido!`);
        confirmacao.classList.remove('none', 'green');
        confirmacao.classList.add('red');
        recusado.classList.remove('none');
        return false;
    }
}

// Função para validar entrada do CPF e chamar a validação
function verificaCpf(date) {
    let newCpf = date.replace(/\D+/g, ''); // Remove caracteres não numéricos

    if (newCpf.length === 11) {
        const arrayCpfNumber = newCpf.split('').map(Number);
        return validarCpf(arrayCpfNumber);
    } else {
        console.log(`CPF mal informado.`);
        return false;
    }
}

// Evento para verificar CPF ao clicar no botão
cpfVerficar.addEventListener('click', (e) => {
    e.preventDefault();
    confirmacao.classList.add('none');
    confirmacao.classList.remove('red', 'green');
    aprovado.classList.add('none');
    recusado.classList.add('none');
    verificaCpf(cpf.value);
});
