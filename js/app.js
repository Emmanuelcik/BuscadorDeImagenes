const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.onload = () => {
    formulario.addEventListener("submit", validarForm);
}

function validarForm(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector("#termino").value;

    if(terminoBusqueda === ""){
        mostrarAlerta("Es necesario agregar un término de busqueda");
        return;
    }

    buscarImagenes(terminoBusqueda);

}
function buscarImagenes (termino) {
    const key ="23702476-24505d11d2938c47125f9c28d";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            mostrarImagenes(response.hits)
        })
}
function mostrarImagenes(){
    console.log("here");
}
function mostrarAlerta(mensaje){
    const existeAlerta = document.querySelector(".bg-red-100");
    if(!existeAlerta){
        const divAlerta = document.createElement("div");
        divAlerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", 
                                "py-3", "rounded", "mx-w-lg", "mx-auto", "mt-6", "text-center");
    
        divAlerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        formulario.appendChild(divAlerta);
    
        setTimeout( () =>{
            divAlerta.remove();
        },2000)
    }
   
}