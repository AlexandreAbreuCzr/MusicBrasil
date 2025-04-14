let btn = document.querySelector("#submitBtn");
let infoUser = [];

document.getElementById("resposta").style.display = 'none';

btn.addEventListener('click', function(event) {
    event.preventDefault();

    let nome = document.querySelector("#nome").value.trim();
    let user = document.querySelector("#user").value.trim();
    let senha = document.querySelector("#senha").value;
    let confSenha = document.querySelector("#confSenha").value;
    let email = document.querySelector("#email").value.trim();
    let dataNasc = document.querySelector("#dataNasc").value;

    verificarForm(nome, user, senha, confSenha, email, dataNasc);
});

function verificarForm(nome, user, senha, confSenha, email, dataNasc) {
    let nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,15}$/;
    let userRegex = /^[A-Za-z0-9]{4,20}$/;
    let senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let anoMinimo = 2010;
    let anoNascimento = new Date(dataNasc).getFullYear();

    if (!nome && !user && !senha && !confSenha && !email && !dataNasc) {
        return mensagemErro("Por favor, preencha todos os campos.");
    }

    if (!nomeRegex.test(nome)) {
        return mensagemErro("O nome deve conter apenas letras e no máximo 15 caracteres.");
    }

    if (!userRegex.test(user)) {
        return mensagemErro("O usuário deve ter entre 4 e 20 caracteres, apenas letras e números.");
    }

    if (!senhaRegex.test(senha)) {
        return mensagemErro("A senha deve ter no mínimo 8 caracteres e conter letras e números.");
    }

    if (senha !== confSenha) {
        return mensagemErro("As senhas não coincidem.");
    }

    if (!emailRegex.test(email)) {
        return mensagemErro("E-mail inválido.");
    }

    if (!dataNasc || anoNascimento > anoMinimo) {
        return mensagemErro("Você precisa ter no mínimo 15 anos (nascido até 2010).");
    }
    // Buscar usuários já salvos no localStorage
    let usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se o user já existe
    let userExistente = usuariosSalvos.find(u => u.userUser === user);
    if (userExistente) {
        return mensagemErro("Este nome de usuário já está em uso. Escolha outro.");
    }

    // Criar novo usuário
    let novoUsuario = {
        nomeUser: nome,
        userUser: user,
        senhaUser: senha,
        emailUser: email,
        dataNascUser: dataNasc
    };

    // Adicionar e salvar
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

    // Atualizar a variável infoUser
    infoUser = usuariosSalvos;
    window.location.href = "Entrar.html";
    // Mensagem de sucesso
    mensagemErro("Usuário salvo com sucesso!");

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