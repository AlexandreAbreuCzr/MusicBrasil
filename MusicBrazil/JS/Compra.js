let nomeProduto = RecuperarValor("nomeProduto");
let precoProduto = RecuperarValor("precoProduto");
let imgProduto = RecuperarValor("imgProduto");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
console.log(carrinho);

AplicarValores(".nomeProduto", nomeProduto);
AplicarValores(".precoProduto", "R$"+precoProduto);
document.getElementById("imgProduto").src = imgProduto;
AtualizarEstadoBotao(nomeProduto);

let infoUser = JSON.parse(localStorage.getItem("usuarioLogado"));
let logado = localStorage.getItem("logado");
mudarLogado();

function RecuperarValor(valor){
    let value = localStorage.getItem(valor);
    return value;
}

function AplicarValores(valor, texto){
    document.querySelector(valor).innerHTML = texto;
}

function Carrinho()
{   
    if(logado == "true")
    {
        addCarrinho(nomeProduto, precoProduto, imgProduto, 1);
        document.getElementById("carrinhoBtn").classList.add("desativado");
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
    else{
        window.location.href = "Entrar.html";
    }
}

function AtualizarEstadoBotao(nome) {
    let itemExistente = carrinho.find(item => item.produto === nome);
    if (itemExistente) {
        document.getElementById("carrinhoBtn").classList.add("desativado");
    } else {
        document.getElementById("carrinhoBtn").classList.remove("desativado");
    }
}


function addCarrinho(nome, pre, imgP, quantidade){
    let itemIndex = carrinho.findIndex(item => item.produto === nome);

    if (itemIndex !== -1) {
        carrinho.splice(itemIndex, 1);
    }else{
        carrinho.push({
            produto: nome, 
            preco: pre, 
            img: imgP,
            quant: quantidade,
        });
    }
    AtualizarEstadoBotao(nome);
    console.log(carrinho);
}



function mudarLogado(){
    if(logado == "true"){
        document.getElementById("entrar").style.display = 'none';
        document.getElementById("voce").style.display = 'block';
        document.getElementById("nomeU").innerHTML = infoUser[0].nome
    }

}