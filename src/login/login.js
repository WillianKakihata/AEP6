var users= [
    {login: "Renan" , senha: "12354"},
    {login: "Willian" , senha: "54312"}
]

function enviaDados(e) {
    e.preventDefault();
    const form = document.querySelector("#form-login");
    const formData = new FormData(form);

    const username = formData.get("login");
    const senha = formData.get("senha");

  for(var i = 0; i < users.length;i++){
    if(users[i].login == username){
        if(users[i].senha == senha){
            console.log("Login correto");
        }
        else{
            console.log("Login Incorreto");
        }
    }
  }
}

document.querySelector("#form-login").addEventListener("submit", enviaDados);
