let checkbox = document.querySelector(".checkbox");

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
}

//document.getElementById("form").addEventListener("submit", (e) => {e.preventDefault();});
//document.getElementById("verificar").addEventListener("click", () => {verificarCaptcha()});

function verificarCaptcha(){
    let nombre = document.querySelector("#nombre").value;
    let email = document.querySelector("#email").value;
    let numero = parseInt(document.querySelector("#captcha").value);
    let respuesta = document.querySelector("#respuesta");
    let verificar = verificarCampos(nombre, email);
    let arreglo = ["Error en el email", "Error en el nombre", "Error los campos estan vacios"];
    if ( verificar === -1){
        if (numero === (valor1+valor2)) {
            respuesta.innerHTML = "Captcha Correcto";
        }else{
            respuesta.innerHTML = "Captcha Incorrecto, intente nuevamente";
        }
    }else{
        respuesta.innerHTML = `<p>${arreglo[verificar]}</p>`
    }
}
function verificarCampos (nombre, email){
    const patron = ["@gmail.com", "hotmail.com", "@yahoo.com.ar"];
    if (nombre.trim() == "" && email.trim() == "") {
        return 2;
    }
    if((!(nombre>'a' && nombre<'z') && !(nombre>'A' && nombre<'Z'))){
        return 1;
    }
    if (!(email.includes(patron[0]) || email.includes(patron[1]) || email.includes(patron[2]))){
        return 0;
    }
    return -1;
}

document.getElementById('menu-hamburguesa').addEventListener('click', function() {
    let children = this.querySelectorAll('.linea');

    // Cambiar clases en los hijos específicos
    children[0].classList.toggle('rotar-arriba');
    children[1].classList.toggle('desaparecer');
    children[2].classList.toggle('rotar-abajo');
});