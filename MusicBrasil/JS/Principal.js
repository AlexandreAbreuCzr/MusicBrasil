function compra(nome, preco, img){
    localStorage.setItem("nomeProduto", nome);
    localStorage.setItem("precoProduto", preco);
    localStorage.setItem("imgProduto", img);
}
let infoUser = JSON.parse(localStorage.getItem("usuarioLogado"));

console.log(infoUser);
let logado = localStorage.getItem("logado");
mudarLogado();



function mudarLogado(){
    if(logado == "true"){
        document.getElementById("entrar").style.display = 'none';
        document.getElementById("voce").style.display = 'block';
        document.getElementById("nomeU").innerHTML = infoUser[0].nome
    }

}
