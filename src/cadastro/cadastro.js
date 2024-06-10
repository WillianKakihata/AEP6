const usuarios = [
    { login: "Renan", senha: "12354" },
    { login: "Willian", senha: "54312" }
];


function validaCadastro(){
    evento.preventDefault();
    const p = document.querySelector("#resultado-cadastro");
    const form = document.querySelector("#form-cadastro");
    const formData = new FormData(form);

    const login = formData.get("nome");
    const email = formData.get("email");
    const senha = formData.get("senha");
    const repetirsenha = formData.get("repetirsenha");
    var contRepetido = 0;

    if(senha == repetirsenha){
        for(var x = 0; x < usuarios.length;x++){
            if(login == usuarios[x].login){
                contRepetido++;
            }
        }
        if(contRepetido == 0){
            p.textContent = "Usuario Criado Com Sucesso!"
            window.location.href = "../quizzes/quizzes.html"
        }
        else{
            p.textContent = "Usuario já existe!"
        }
    }
    else{
        p.textContent = "senhas diferentes, corrija!!"
    }


}


function verifica