document.querySelector("button").onclick = () => {
    //pegar valor digitado
    const novo = document.querySelector("input").value;
    //criar div
    const todo = document.createElement("div");
    //criar input checkbox com id
    const input = document.createElement("input");
    const att = document.createAttribute("type");
    att.value = "checkbox";
    const id = document.createAttribute("id");
    id.value = novo;
    input.setAttributeNode(att);
    input.setAttributeNode(id);
    //add chamada de onclick
    /* const click = document.createAttribute("onclick"); */
    //add input ao div criado
    todo.appendChild(input);
    //criar label com for e htmlInner
    const label = document.createElement("label");
    const fora = document.createAttribute("for");
    fora.value = novo;
    label.setAttributeNode(fora);
    label.textContent = novo;
    //add label ao div
    todo.appendChild(label);
    //atributo de margin no div novo
    todo.classList.add("margem");
    //add div todo a parte certa do browser
    document.querySelector(".todo").appendChild(todo);
    document.querySelector("input").value = "";
    fetch('http://localhost:3000/', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            descricao: novo,
        })
    });
}
