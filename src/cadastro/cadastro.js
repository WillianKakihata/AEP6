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
                // Aqui você pode continuar com a lógica para adicionar o usuário ao array `usuarios`
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

document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    validaCadastro(event); // Chama a função validaCadastro para validar o formulário

    const nome = event.target.nome.value;
    const email = event.target.email.value;
    const senha = event.target.senha.value;
    const repetirSenha = event.target.repetirsenha.value;
    
    if (senha !== repetirSenha) {
        document.getElementById('resultado-cadastro').innerText = 'As senhas não coincidem';
        return;
    }

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password: senha })
        });

        const result = await response.json();
        
        if (response.ok) {
            document.getElementById('resultado-cadastro').innerText = 'Usuário registrado com sucesso!';
        } else {
            document.getElementById('resultado-cadastro').innerText = result.message || 'Erro ao registrar usuário';
        }
    } catch (error) {
        document.getElementById('resultado-cadastro').innerText = 'Erro ao registrar usuário';
    }
});
