import { Juego } from "../js/Juego.js";
import { Cronometro } from "../js/cronometro.js";


window.onload = () => {
    const cancion = new Audio('../audio/counter-strike-song.mp3');
    cancion.loop = true;
    cancion.volume = 0.2;

    const gameSelection = document.querySelector('.game-selection');

    document.getElementById('play').addEventListener('click', () => {
        gameSelection.classList.remove('hidden');
    });

    const buttons1 = document.querySelectorAll('.modo-juego .button1');
    const buttons2 = document.querySelectorAll('.grupo-fichas-1 .button1');
    const buttons3 = document.querySelectorAll('.grupo-fichas-2 .button1');
    const startButton = document.getElementById('start');
    const cronometroContainer = document.getElementById('cronometro'); // Contenedor del cronómetro

    let activatedButtons = { group1: false, group2: false, group3: false };

    // Función para verificar si todos los grupos están activados
    const checkIfAllActivated = () => {
        return activatedButtons.group1 && activatedButtons.group2 && activatedButtons.group3;
    };

    // Manejo de clics para el primer grupo
    buttons1.forEach(button => {
        button.addEventListener('click', () => {
        buttons1.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');
        activatedButtons.group1 = button.classList.contains('active'); // Actualiza el estado del grupo 1
        console.log("Botón apretado grupo 1:", button.getAttribute('data-id'));
        enableStartButton(); // Verifica si habilitar el botón de inicio
        });
    });

    // Manejo de clics para el segundo grupo
    buttons2.forEach(button => {
        button.addEventListener('click', () => {
        buttons2.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');
        activatedButtons.group2 = button.classList.contains('active'); // Actualiza el estado del grupo 2
        console.log("Botón apretado grupo 2:", button.getAttribute('data-id'));
        enableStartButton(); // Verifica si habilitar el botón de inicio
        });
    });

    // Manejo de clics para el tercer grupo
    buttons3.forEach(button => {
        button.addEventListener('click', () => {
        buttons3.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');
        activatedButtons.group3 = button.classList.contains('active'); // Actualiza el estado del grupo 3
        console.log("Botón apretado grupo 3:", button.getAttribute('data-id'));
        enableStartButton(); // Verifica si habilitar el botón de inicio
        });
    });

    // Función para habilitar el botón de inicio
    const enableStartButton = () => {
        if (checkIfAllActivated()) {
        startButton.disabled = false; // Habilitar el botón de inicio si todos los grupos están activados
        } else {
        startButton.disabled = true; // Deshabilitar el botón de inicio si faltan grupos
        }
    };

    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");

    // Manejo del clic en el botón de inicio
    startButton.addEventListener('click', () => {
        if (checkIfAllActivated()) {
            canvas.classList.remove('hidden');
            alert("¡Todos los botones están activados! Iniciando...");
            cronometroContainer.classList.remove('hidden'); 

            cancion.play();


            const activatedButton = Array.from(buttons1).find(btn => btn.classList.contains('active'));

            console.log("Botón activado en modo-juego:", activatedButton.getAttribute('data-id'));

            
            let nEnLinea = parseInt(activatedButton.getAttribute('data-id'), 10); //get Atributte devuelve string, por eso hay que convertirlo a int
            let p = document.getElementById("x-en-linea");
            p.textContent= `${nEnLinea} en linea CSGO`;
            const cronometro = new Cronometro("cronometro", 10); // Cuenta regresiva de 10
            cronometro.iniciar();

            
            
            // Establece el tamaño del canvas al tamaño real;
            canvas.width = canvas.clientWidth; 
            canvas.height = canvas.clientHeight; //canvas.clientHeight funciona para cuando el canvas sufre una transformacion desde el css
            let width = canvas.width;
            let height = canvas.height;

            const tamaniosTablero = {
                4: { filas: 6, columnas: 7 },
                5: { filas: 7, columnas: 8 },
                6: { filas: 8, columnas: 9 },
                7: { filas: 9, columnas: 10 }
            };

            const radiosFichas = {
                4: 35,
                5: 30,
                6: 25,
                7: 20,
            };

            const margenes = {
                4: 25,
                5: 20,
                6: 15,
                7: 15
            };

            console.log("hola11");

            // nEnLinea1.addEventListener('change', () => {
            //     location.reload();
            // })

            // document.querySelector('#jugar').addEventListener('click', () => {
            //     let nEnLinea = nEnLinea1.value;
            //     let juego = new Juego (canvas, ctx, width, height, `${nEnLinea} en linea`, tamaniosTablero[nEnLinea].filas, tamaniosTablero[nEnLinea].columnas, nEnLinea, radiosFichas[nEnLinea], margenes[nEnLinea]);
            //     juego.inicializarJuego();
            // });

            let juego = new Juego (canvas, ctx, width, height, `${nEnLinea} en linea`, tamaniosTablero[nEnLinea].filas, tamaniosTablero[nEnLinea].columnas, nEnLinea, radiosFichas[nEnLinea], margenes[nEnLinea]);
            juego.inicializarJuego();
        } else {
            alert("Faltan botones por apretar.");
        }
    });

    // Deshabilitar el botón de inicio al principio
    startButton.disabled = true;

    

    function limpiarCanvas(){
        // Limpia el canvas antes de redibujar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

