let btn = document.querySelector("#submitBtn");
let infoUser = [];

document.getElementById("resposta").style.display = 'none';

btn.addEventListener('click', function(event) {
    event.preventDefault();

    let user = document.querySelector("#user").value.trim();
    let senha = document.querySelector("#senha").value;


    verificarForm(user, senha);
});

function verificarForm(user, senha){
    if(!user || !senha){
        return mensagemErro("Por favor, preencha todos os campos.");
    }
    let usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    let userExistente = usuariosSalvos.find(u => u.userUser === user);
    if (!userExistente) {
        return mensagemErro("Usuario não existe");
    }
    if (userExistente.senhaUser !== senha) {
        return mensagemErro("Senha incorreta.");
    }
    localStorage.setItem("logado", "true");
    infoUser = [{
        nome: userExistente.nomeUser,
        usuario: userExistente.userUser,
        senhaUsuario: userExistente.senhaUser,
        emailUsuario: userExistente.emailUser,
        dataNascUsuario: userExistente.dataNasc
    }]
    // Antes de salvar o novo login
    localStorage.removeItem("usuarioLogado"); // limpa qualquer usuário anterior
    localStorage.setItem("usuarioLogado", JSON.stringify(infoUser));
    window.location.href = "Principal.html";
    
}

function mensagemErro(msg) {
    let resposta = document.getElementById("resposta");
    let campo = document.querySelector("#respostaForm");
    resposta.style.display = 'block';
    campo.innerHTML = msg;
}
infoUser = JSON.parse(localStorage.getItem("usuarioLogado"));
let logado = localStorage.getItem("logado");
mudarLogado();



function mudarLogado(){
    if(logado == "true"){
        document.getElementById("entrar").style.display = 'none';
        document.getElementById("voce").style.display = 'block';
        document.getElementById("nomeU").innerHTML = infoUser[0].nome
    }

}
