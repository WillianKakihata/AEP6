var users = [
    { login: "Renan", senha: "12354" },
    { login: "Willian", senha: "54312" }
];

function enviaDados(e) {
    e.preventDefault();
    const form = document.querySelector("#form-login");
    const formData = new FormData(form);

    const username = formData.get("login");
    const senha = formData.get("senha");

    let userFound = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].login === username) {
            userFound = true;
            if (users[i].senha === senha) {
                console.log("Login correto");
                alert("Login bem-sucedido!");
            } else {
                console.log("Senha incorreta");
                alert("Senha incorreta!");
            }
            break; // Sai do loop uma vez que o usuário foi encontrado
        }
    }

    if (!userFound) {
        console.log("Login não encontrado");
        alert("Login não encontrado!");
    }
}

document.querySelector("#form-login").addEventListener("submit", enviaDados);
