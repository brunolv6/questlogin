
document.querySelector("button").onclick = () => {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#password").value;
    let n = 2; //login
    if(document.querySelector("#nome") !== null){
        /* IMPORTANTÍSSIMO */
        /* SE DEFINIDO DENTRO DAQUI NOME NÃO PASSARÁ NO JSON NO CADASTRO!!! */
        /* const nome = document.querySelector("#nome").value; */
        n = 3; //register
    }
    if(email && senha && n === 2){
        fetch("http://localhost:3000/users", {
            method: "put",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: senha
            })
        }).then((res) => res.json())
        .then((dado) => {
            console.log(dado);
            if(dado.id){
                n = 4;
            } else {
                alert(dado);
            }
        })
        .then(() => {
            document.querySelector("#password").value = "";
        })
        .then(() => {
            if(n === 4){
                window.location.href = "../questList/index.html";
            }
        });
    } else if(email && senha && n === 3) {
        const nome = document.querySelector("#nome").value;
        fetch("http://localhost:3000/users", {
            method: "post",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                nome: nome,
                email: email,
                password: senha
            })
        }).then((res) => res.json())
        .then((dado) => {
            if(dado === "Tudo Certo!"){
                window.location.href = "../questList/index.html";
            } else {
                alert(dado);
            }
        })
/*         .then(() => window.location.href = "../questList/index.html"); */
    } else {
        alert("Você precisa adicionar um nome, email e senha para registrar!");
    }
}

document.querySelector(".registrar").onclick = () => {
    document.querySelector("#password").value = "";
    //trocando título
    document.querySelector(".titulo").innerHTML = "Registrar";

    //criar atributo type e dar seu valor
    const ty = document.createAttribute("type");
    ty.value = "text";
    //criar atributo id e dar seu valor
    const id = document.createAttribute("id");
    id.value = "nome";
    //criar atributo placeholder e dar seu valor
    const pl = document.createAttribute("placeholder");
    pl.value = "nome..";
    //criar input e dar seus atributos
    const input = document.createElement("input");
    input.setAttributeNode(ty);
    input.setAttributeNode(id);
    input.setAttributeNode(pl);
    //cria div
    const di = document.createElement("div");
    di.appendChild(input);

    //add input no div correto
    document.querySelector(".dados").insertBefore(di, document.querySelector("#firstDiv"));

    //registrar ao final trocar por login
    document.querySelector("#entrar").innerHTML = "Login";
    document.querySelector("#entrar").classList.remove("registrar");
    document.querySelector("#entrar").classList.add("login");
}