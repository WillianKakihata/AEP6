document.addEventListener('DOMContentLoaded', ()=>{
    enviaDados();
})

function enviaDados(e){
    e.preventDefault();
    const form = document.querySelector("#form-login");
    const formData = new FormData(form);
    console.log(formData.get("login"));
    console.log(formData.get("senha")); 
}