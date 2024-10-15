const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


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
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		window.location.href = "../html/home.html";	
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

let opciones = document.querySelectorAll(".opcion");
opciones.forEach(element => {
    element.addEventListener("click", () => {
		const tieneClase = Array.from(opciones).some(el => el.classList.contains("border-left"));

		console.log(element.textContent);
        // Si no hay ningún elemento con la clase "border-left", se puede agregar la clase al elemento clickeado
        if (!tieneClase) {
            element.classList.add("border-left");
			if (/^\d{1,2}$/.test(element.textContent)) {
				document.querySelector("#dia").textContent = element.textContent;
			}
			// Si es un número de cuatro cifras (un año)
			else if (/^\d{4}$/.test(element.textContent)) {
				document.querySelector("#anio").textContent = element.textContent;
			}
			// Si no es un número, se considera un mes
			else if (isNaN(element.textContent)) {
				document.querySelector("#mes").textContent = element.textContent;
			}

        }else if (element.classList.contains("border-left")){
			element.classList.remove("border-left");
			if (/^\d{1,2}$/.test(element.textContent)) {
				document.querySelector("#dia").textContent = "Día";
			}
			// Si es un número de cuatro cifras (un año)
			else if (/^\d{4}$/.test(element.textContent)) {
				document.querySelector("#anio").textContent =  "Mes";
			}
			// Si no es un número, se considera un mes
			else if (isNaN(element.textContent)) {
				document.querySelector("#mes").textContent = "Año";
			}
		}
    });
});

// Función para alternar flechas y gestionar el estado de los botones
function toggleFlechas(buttonId) {
	const button = document.getElementById(buttonId);
	const flechas = button.getElementsByClassName('flecha');
	
	// Ocultar o mostrar las flechas
	for (let i = 0; i < flechas.length; i++) {
	  flechas[i].classList.toggle('hidden');
	}
}
  
  // Event listeners para los tres botones
document.getElementById('dia').addEventListener('click', function() {
	toggleFlechas('dia');
	document.querySelector('.contenedor-dias').classList.toggle('invisible');
});
  
document.getElementById('mes').addEventListener('click', function() {
	toggleFlechas('mes');
	document.querySelector('.contendor-meses').classList.toggle('invisible');
});
  
document.getElementById('anio').addEventListener('click', function() {
	toggleFlechas('anio');
	document.querySelector('.contendor-anios').classList.toggle('invisible');
});

