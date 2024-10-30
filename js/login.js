const form = document.getElementById('formulario');

let checkbox = document.querySelector(".checkbox");

let verificado = false;

checkbox.addEventListener("click", () => {
    // Verifica si el checkbox ya tiene la clase 'verificado'
    if (!checkbox.classList.contains('verificado')) {
        checkbox.classList.remove('checkbox');
        checkbox.classList.add('spinner');

        setTimeout(cambiar, 3000);
    }
});

function cambiar(){
    let spinner = document.querySelector(".spinner");
    // Eliminar la clase spinner
    spinner.classList.remove('spinner');

    // Crear un nuevo elemento de imagen
    let img = document.createElement('img');
    img.src = "../iconos/check-icon.svg"; // Cambia a la ruta de tu imagen
    img.alt = "Check Icon"; // Añade un texto alternativo para la imagen

    // Limpiar el contenido del div antes de agregar la imagen
    spinner.innerHTML = ''; // Elimina cualquier contenido existente

    // Agregar la imagen al div
    spinner.appendChild(img);

    // Agregar la clase 'verificado' para evitar más clics
    spinner.classList.add('verificado');

    verificado = true;
}


form.addEventListener('submit', (e) => {
	e.preventDefault();

	if(verificado){
		window.location.href = "../html/home.html";	
	} else {
		mensajeError.classList.remove('hidden');
	}
});