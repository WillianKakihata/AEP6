const usuarios = [
    { login: "Renan", senha: "12354" },
    { login: "Willian", senha: "54312" }
];

function validaCadastro(evento) {
    evento.preventDefault();
    const p = document.querySelector("#resultado-cadastro");
    const form = document.querySelector("#form-cadastro");
    const formData = new FormData(form);

    const login = formData.get("nome");
    const email = formData.get("email");
    const senha = formData.get("senha");
    const repetirsenha = formData.get("repetirsenha");
    let contRepetido = 0;

  
    console.log("Login:", login);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Repetir Senha:", repetirsenha);

   
    if (login.length > 3 && email.length > 3 && senha.length > 3) {
        if (senha === repetirsenha) {
            for (const usuario of usuarios) {
                if (login === usuario.login) {
                    contRepetido++;
                    break;
                }
            }

            if (contRepetido === 0) {
                usuarios.push({ login: login, senha: senha }); 
                p.textContent = "Usuário criado com sucesso!";
                setTimeout(() => {
                    window.location.href = "../quizzes/quizzes.html"; 
                }, 2000);
            } else {
                p.textContent = "Usuário já existe!";
            }
        } else {
            p.textContent = "Senhas diferentes, corrija!";
        }
    } else {
        p.textContent = "Login, email e senha devem ter mais de 3 caracteres!";
    }
}

document.querySelector("#form-cadastro").addEventListener("submit", validaCadastro);
