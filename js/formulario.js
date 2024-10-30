const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
let checkbox = document.querySelector(".checkbox");
let captchaVerificado = false;
const mensajeError = document.getElementById('formulario__mensaje'); // Obtenemos el div de error

const selectDia = document.querySelector('.contenedor-dias');
const selectMes = document.querySelector('.contenedor-meses');
const selectAnio = document.querySelector('.contenedor-anios');

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

	captchaVerificado = true;
}

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*!]).{8,}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@(gmail\.com|yahoo\.com\.ar|icloud\.com|outlook\.com)$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const divs = Array.from(document.querySelectorAll('.check-security-password div'));
const parrafo = document.querySelector('.check-security-password p');
const messages = {
	corto: "Muy corta",
	debil: "Débil",
	bien: "Bien",
	excelente: "Excelente"
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		console.log(expresion.test(input.value));
		console.log(document.querySelector(`#grupo__${campo} img`));
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} img`).src =  "../iconos/check-icon.svg";
		document.querySelector(`#grupo__${campo} img`).classList.add('visible');
		document.querySelector(`#grupo__${campo} img`).classList.remove('invisible');
		document.querySelector(`#grupo__${campo} .formulario_mensaje`).classList.remove('error');
		if(campo==='password'){
			divs[0].classList.remove("green-good");
			divs[1].classList.remove("green-good");
			divs[2].classList.remove("green-good");
			parrafo.classList.remove("green-good-text-color");

			divs[0].classList.add("green-excelent");
			divs[1].classList.add("green-excelent");
			divs[2].classList.add("green-excelent");
			divs[3].classList.add("green-excelent");
			parrafo.classList.add("green-excelent-text-color");
			parrafo.innerHTML = messages.excelente;
		}
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} img`).src = "../iconos/error-icon.svg";
		document.querySelector(`#grupo__${campo} img`).classList.add('visible');
		document.querySelector(`#grupo__${campo} img`).classList.remove('invisible');
		document.querySelector(`#grupo__${campo} .formulario_mensaje`).classList.add('error');
		if(campo === 'password'){
			document.querySelector(`#grupo__${campo} .check-security-password`).classList.remove('hidden');
			console.log(input.value);

			const requirements = {
				length: input.value.length >= 8,
				uppercase: /[A-Z]/.test(input.value),
				number: /[0-9]/.test(input.value),
				special: /[@#$%^&*!]/.test(input.value)
			};
			console.log(input.value.length);
			console.log(requirements.length);
			console.log(requirements.uppercase);
			console.log(requirements.special);

			// Verificar la longitud
			if (!requirements.length || !requirements.uppercase && !requirements.number || !requirements.special) {
				divs[0].classList.remove("yellow");
				divs[1].classList.remove("yellow");
				divs[0].classList.remove("green-good");
				divs[1].classList.remove("green-good");
				divs[2].classList.remove("green-good");
				divs[0].classList.remove("green-excelent");
				divs[1].classList.remove("green-excelent");
				divs[2].classList.remove("green-excelent");
				divs[3].classList.remove("green-excelent");

				divs[0].classList.add("red");

				parrafo.classList.remove("yellow-text-color");
				parrafo.classList.remove("green-good-text-color");
				parrafo.classList.remove("green-excelent-text-color");

				parrafo.classList.add("red-text-color");

				parrafo.innerHTML = messages.corto;
			}
		
			// Verificar si la contraseña es débil
			if (requirements.length || requirements.uppercase && requirements.number || requirements.special) {
				divs[0].classList.remove("red");
				divs[0].classList.remove("green-good");
				divs[1].classList.remove("green-good");
				divs[2].classList.remove("green-good");
				divs[0].classList.remove("green-excelent");
				divs[1].classList.remove("green-excelent");
				divs[2].classList.remove("green-excelent");
				divs[3].classList.remove("green-excelent");
				
				divs[0].classList.add("yellow");
				divs[1].classList.add("yellow");


				parrafo.classList.remove("red-text-color");
				parrafo.classList.remove("green-good-text-color");
				parrafo.classList.remove("green-excelent-text-color");

				parrafo.classList.add("yellow-text-color");

				parrafo.innerHTML = messages.debil;
			}
		
			// Verificar si la contraseña está bien
			if (requirements.length && requirements.uppercase && requirements.number || requirements.length && requirements.special || requirements.uppercase && requirements.number &&requirements.special) {
				divs[0].classList.remove("red");
				divs[0].classList.remove("yellow");
				divs[1].classList.remove("yellow");
				divs[0].classList.remove("green-excelent");
				divs[1].classList.remove("green-excelent");
				divs[2].classList.remove("green-excelent");
				divs[3].classList.remove("green-excelent");

				divs[0].classList.add("green-good");
				divs[1].classList.add("green-good");
				divs[2].classList.add("green-good");

				parrafo.classList.remove("red-text-color");
				parrafo.classList.remove("yellow-text-color");
				parrafo.classList.remove("green-excelent-text-color");

				parrafo.classList.add("green-good-text-color");

			

				parrafo.innerHTML = messages.bien;

			}
		}
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 img`).src = "../iconos/error-icon.svg";
		document.querySelector(`#grupo__password2 img`).classList.add('visible');
		document.querySelector(`#grupo__password2 img`).classList.remove('invisible');
		document.querySelector(`#grupo__password2 .formulario_mensaje`).classList.add('error');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 img`).src =  "../iconos/check-icon.svg";
		document.querySelector(`#grupo__password2 img`).classList.add('visible');
		document.querySelector(`#grupo__password2 img`).classList.remove('invisible');
		document.querySelector(`#grupo__password2 .formulario_mensaje`).classList.remove('error');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked && captchaVerificado){
		window.location.href = "../html/home.html";	
	} else {
		mensajeError.classList.remove('hidden');
	}
});

