const resultado = document.querySelector("#resultado");

const formulario = document.querySelector("#formulario");
resultado.style.maxWidth = "1000px";
resultado.style.width = "90%";

const paginacionDiv = document.querySelector("#paginacion");
paginacionDiv.style.width = "90%";
paginacionDiv.style.marginLeft = "auto";
paginacionDiv.style.marginRight = "auto";

const registrosPerPage = 40;
let totalPaginas;
let iterador;

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
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPerPage}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            totalPaginas = calcularPaginas(response.totalHits);
            // console.log(totalPaginas)
            mostrarImagenes(response.hits)
        })
}
//Generador que registra la cantidad de elementos de acuerdo a las paginas 

function *crearPaginador(total){
    for(let i = 0; i <= total; i++){
        yield i;
    }
}
function calcularPaginas(total){
    return parseInt(Math.ceil(total / registrosPerPage))
}

function mostrarImagenes(imagenes){
    console.log(imagenes)
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    //Iterar sobre el arreglo de imagenes y crear el html
    imagenes.forEach( imagen =>{
        const {previewURL, likes, views, largeImageURL} = imagen;

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 mx-auto p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">
                <div class="p-4">
                    <p class="font-bold"> ${likes} <span class="font-light">Me gusta</span></p>
                    <p class="font-bold"> ${views} <span class="font-light">Veces vista</span></p>
                    <a
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center
                        rounded mt-5 p-1" 
                        href="${largeImageURL}" target="_blank" 
                        rel="noopener noreferrer"
                    >Ver Imagen</a>
                </div>    
            </div>
        </div>
        `;
    });
    //Limpiar pagiador previo
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild)
    }
    imprimirPaginador();
}
function  imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    while(true){
        const {value, done} = iterador.next();
        if(done) return

        const boton = document.createElement("a");
        boton.href = "#";
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add("siguiente", "bg-yellow-400", "px-4", "py-1", "mr-1", "font-bold", "mb-1",
        "uppercase", "rounded");
        paginacionDiv.append(boton);
    }
    
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