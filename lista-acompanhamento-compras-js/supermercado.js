var itens = [];

document.querySelector("input[type=submit]")
.addEventListener("click",()=>{
    var nomeProduto = document.querySelector("input[name=nome_produto]");
    var valorPreco = document.querySelector("input[name=valor_produto]");
    
    itens.push({
        nome: nomeProduto.value,
        valor: valorPreco.value
    });
    


    let listaProdutos = document.querySelector(".Lista-Produtos")
    let soma = 0;
    listaProdutos.innerHTML = "";
    itens.map(function(val){
        soma+=parseFloat(val.valor);

        listaProdutos.innerHTML+=`
                <div class="Lista-Produtos-Single">
                <h3>`+val.nome+`</h3>
                <h3 class="price-produto"><span>`+val.valor+`</span></h3>
                </div>
        `;
    })
    soma = soma.toFixed(2);
    nomeProduto.value = "";
    valorPreco.value = "";

    let elementoSoma = document.querySelector(".Soma-Total h1")
    elementoSoma.innerHTML = `R$`+soma;

})

document.querySelector("button[name=Limpar]")
.addEventListener("click",()=>{
    itens = [];

    document.querySelector(".Lista-Produtos").innerHTML="";
    document.querySelector(".Soma-Total h1").innerHTML="Valor Total R$0";

})