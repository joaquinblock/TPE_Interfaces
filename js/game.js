import { Juego } from "../js/Juego.js";
import { Cronometro } from "../js/cronometro.js";


    if (sessionStorage.getItem('forcedReload')) {
        sessionStorage.removeItem('forcedReload');

        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");    
        canvas.classList.remove('hidden');

        const cronometroContainer = document.getElementById('cronometro'); // Contenedor del cronómetro
        cronometroContainer.classList.remove('hidden');

        // Establece el tamaño del canvas al tamaño real;
        canvas.width = canvas.clientWidth; 
        canvas.height = canvas.clientHeight; //canvas.clientHeight funciona para cuando el canvas sufre una transformacion desde el css
        let width = canvas.width;
        let height = canvas.height;

        // Verifica si los datos del juego están en sessionStorage
        if (sessionStorage.getItem('datosJuego')) {
            // Recuperar y parsear los datos
            const datosJuego = JSON.parse(sessionStorage.getItem('datosJuego'));

            const imagenCt = new Image();
            imagenCt.src = datosJuego.imagenCt;

            const imagenTerror = new Image();
            imagenTerror.src = datosJuego.imagenTerror;
            
            const juegoNuevo = new Juego(
                canvas,
                ctx,
                width,
                height,
                datosJuego.tipo,
                datosJuego.filas,
                datosJuego.columnas,
                datosJuego.nEnLinea,
                datosJuego.radioFicha,
                datosJuego.margen,
                imagenCt,
                imagenTerror
            );

            
            const cronometro = new Cronometro("cronometro", 0.5, juegoNuevo); // Cuenta regresiva de 10
            cronometro.iniciar();

            juegoNuevo.inicializarJuego();
        } else {
            console.log('No hay datos de juego guardados.');
        }
    } else {
        // La página fue recargada manualmente desde el navegador o es la primera carga
        console.log('La página se cargó manualmente o es la primera carga.');
    }

    if (sessionStorage.getItem('backPage')) {
        sessionStorage.removeItem('backPage');
        const gameSelection = document.querySelector('.game-selection');
        gameSelection.classList.remove('hidden');
        
    } else {
        // La página fue recargada manualmente desde el navegador o es la primera carga
        console.log('La página se cargó manualmente o es la primera carga.');
    }


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

    let imagenCt = null;
    let imagenTerror = null;

    // Manejo de clics para el primer grupo
    buttons1.forEach(button => {
        button.addEventListener('click', () => {
        buttons1.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');

        activatedButtons.group1 = button.classList.contains('active'); // Actualiza el estado del grupo 1

        enableStartButton(); // Verifica si habilitar el botón de inicio
        });
    });

    // Manejo de clics para el segundo grupo
    buttons2.forEach(button => {
        button.addEventListener('click', () => {
        buttons2.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');

        const img = button.querySelector('img');
    

        imagenCt = img;

        activatedButtons.group2 = button.classList.contains('active'); // Actualiza el estado del grupo 2
 
        enableStartButton(); // Verifica si habilitar el botón de inicio
        });
    });

    // Manejo de clics para el tercer grupo
    buttons3.forEach(button => {
        button.addEventListener('click', () => {
        buttons3.forEach(btn => btn.classList.remove('active'));
        button.classList.toggle('active');

        const img = button.querySelector('img');
      

        imagenTerror = img;

        activatedButtons.group3 = button.classList.contains('active'); // Actualiza el estado del grupo 3
       
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

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Manejo del clic en el botón de inicio
    startButton.addEventListener('click', () => {
        if (checkIfAllActivated()) {
            alert("¡Todos los botones están activados! Iniciando...");
            iniciar();
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

    function iniciar() {
            canvas.classList.remove('hidden');
            const background_cs = document.querySelector(".background-cs");
            background_cs.classList.remove('hidden');
            cronometroContainer.classList.remove('hidden'); 

            const activatedButton = Array.from(buttons1).find(btn => btn.classList.contains('active'));

           

            
            let nEnLinea = parseInt(activatedButton.getAttribute('data-id'), 10); //get Atributte devuelve string, por eso hay que convertirlo a int
            let p = document.getElementById("x-en-linea");
            p.textContent= `${nEnLinea} en linea CSGO`;

            
            
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
                4: 30,
                5: 25,
                6: 25,
                7: 20,
            };

            const margenes = {
                4: 15,
                5: 15,
                6: 15,
                7: 15
            };

            // nEnLinea1.addEventListener('change', () => {
            //     location.reload();
            // })

            // document.querySelector('#jugar').addEventListener('click', () => {
            //     let nEnLinea = nEnLinea1.value;
            //     let juego = new Juego (canvas, ctx, width, height, `${nEnLinea} en linea`, tamaniosTablero[nEnLinea].filas, tamaniosTablero[nEnLinea].columnas, nEnLinea, radiosFichas[nEnLinea], margenes[nEnLinea]);
            //     juego.inicializarJuego();
            // });

            let juego = new Juego (canvas, ctx, width, height, `${nEnLinea} en linea`, tamaniosTablero[nEnLinea].filas, tamaniosTablero[nEnLinea].columnas, nEnLinea, radiosFichas[nEnLinea], margenes[nEnLinea], imagenCt, imagenTerror);
            const cronometro = new Cronometro("cronometro", 0.5, juego); // Cuenta regresiva de 10
            cronometro.iniciar();
            juego.inicializarJuego();
    }

