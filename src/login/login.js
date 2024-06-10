const usuarios = [
    { login: "Renan", senha: "12354" },
    { login: "Willian", senha: "54312" }
];

function enviaDados(evento) {
    evento.preventDefault();
    const p = document.querySelector("#resultado-login");
    const form = document.querySelector("#form-login");
    const formData = new FormData(form);

    const login = formData.get("login");
    const senha = formData.get("senha");

    let usuarioEncontrado = false;

    for (const usuario of usuarios) {
        if (usuario.login === login) {
            usuarioEncontrado = true;
            if (usuario.senha === senha) {
                p.textContent = "Login bem-sucedido!"
                window.location.href = "../quizzes/quizzes.html"
            } else {
                p.textContent = "Login ou Senha incorreta"
            }
            break; // Sai do loop uma vez que o usuário foi encontrado
        }
    }

    if (!usuarioEncontrado) {
        console.log("Login não encontrado");
        alert("Login não encontrado!");
    }
}

document.querySelector("#form-login").addEventListener("submit", enviaDados);
