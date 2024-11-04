import { Tablero } from "../js/Tablero.js";
import { Fichero } from "../js/Fichero.js";

export class Juego{
    
    constructor(canvas, ctx, width, height, modoJuego, filas, columnas, nEnLinea, radioFicha, margen, imagenCt, imagenTerror){
        this.nEnLinea = nEnLinea;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.modoJuego = modoJuego;
        this.filas = filas;
        this.columnas = columnas;
        this.radioFicha = radioFicha;
        this.margen = margen;
        this.margenFichas = (this.radioFicha*2) + margen; //el diametro + un numero x
        this.background = new Image();
        this.posIniX = width*0.30;
        this.posIniY = height*0.16;
        this.margenLineas = margen/2;
        this.turnoJugador = Math.random() < 0.5 ? "red" : "blue"; //elije o red o blue
        this.opacidad = 1; //valores entre 0 y 1
        this.tablero1 = new Tablero(filas, columnas, this.posIniX, this.posIniY, this.margenFichas, this.margenLineas, this.radioFicha, ctx);
        this.tablero = this.tablero1.matriz;

        this.imagenCt = imagenCt;
        this.imagenTerror = imagenTerror;

        this.limiteBaseColumn = this.posIniX - this.radioFicha - this.margenLineas;
        this.limiteBaseFila = this.posIniY - this.radioFicha - this.margenLineas;

        /* Background ficha */

        this.backgroundFicha = new Image();

        /*Pos del turno jugaodr*/
        this.xPosTurnoJugador = this.margenLineas + radioFicha;
        this.yPosTurnoJugador = this.height - radioFicha;
        this.xPosTurnoFicha = this.limiteBaseColumn - radioFicha - this.margenLineas;
        this.yPosTurnoFicha = this.height - radioFicha - margen/2;
        
        /*Icon Reset */
        this.iconReset = new Image();
        this.widthIconReset = 50;
        this.xIconReset = this.width - this.widthIconReset;
        this.yIconReset = 0;
        this.heightIconReset = 50;

        /*Icon Back */
        this.iconBack = new Image();
        this.xIconBack = 0;
        this.yIconBack = 0;
        this.widthIconBack = 50;
        this.heightIconBack = 50;


        /*Fichero*/
        this.posFichaCounter = {
            4: {x: 100,
                y: this.posIniY},
            5: {x: 100,
                y: this.posIniY},
            6: {x: 100,
                y: this.posIniY},
            7: {x: 100,
                y: this.posIniY},
        };

        this.posFichaTerror = {
            4: {x: this.width -100,
                y: this.posIniY},
            5: {x: this.width -100,
                y: this.posIniY},
            6: {x: this.width -100,
                y: this.posIniY},
            7: {x: this.width -100,
                y: this.posIniY},
        };
        this.fichasTotales= columnas * filas;
        this.fichasPorJugador = this.fichasTotales / 2;
        this.fichero = new Fichero(this.fichasPorJugador, this.radioFicha, this.ctx, this.posFichaCounter[nEnLinea], this.posFichaTerror[nEnLinea], this.imagenCt, this.imagenTerror);

        /*Eventos*/
        this.onMouseDown = (e) => this.mouseDown(e);
        this.onMouseMove = (e) => this.dibujar(e);
        this.onMouseUp = (e) => this.mouseUp(e);
        
        // Agregamos los eventos de escucha
        this.canvas.addEventListener('mousedown', this.onMouseDown);
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('mouseup', this.onMouseUp);

        /* Ficha agarrada */
        this.estaAgarrando = false;
        this.fichaAgarrada = null;
        this.xIniFichaAgarrada = 0;
        this.yIniFichaAgarrada = 0;

        /* SONGS */
        this.ctWin = new Audio('../audio/ct-win.mp3');
        this.terrorWin = new Audio('../audio/terror-win.mp3');
        this.ctWin.volume = 0.5;
        this.terrorWin.volume = 0.5;
        this.cancion = new Audio('../audio/counter-strike-song.mp3');
        this.cancion.loop = true;
        this.cancion.volume = 0.2;
    }
    // Espera a que la imagen se cargue antes de dibujarla en el canvas
    inicializarJuego(){
        this.background.src = '../img/background-pixel.jpg';

        console.log(this.imagenCt);
        console.log(this.imagenTerror);

        this.background.onload = () => {
            this.cancion.play();
            this.dibujarFondo();
            // this.dibujarBackgroundFicha();
            
            this.backgroundFicha.src = '../img/background-ficha-1.png';
            this.dibujarIconReset();
            this.dibujarIconBack();
            setTimeout(() => {
                this.tablero1.dibujarTablero( undefined, this.opacidad);
            }, 70);
            
            this.fichero.llenarFichero();
            // Agrega un pequeño retraso antes de llamar a dibujarFichas
            setTimeout(() => {
                this.fichero.dibujarFichas();
            }, 80);
            this.dibujarRectangulo();
            this.dibujarTurno();
        };
    }

    mouseDown(e) {
        const mouseX = this.getMousePos(e).x;
        const mouseY = this.getMousePos(e).y;

        this.fichaAgarrada = this.mouseEnFicha(mouseX, mouseY);
        if (this.fichaAgarrada) {
            this.estaAgarrando = true;
            this.xIniFichaAgarrada = this.fichaAgarrada.x;
            this.yIniFichaAgarrada = this.fichaAgarrada.y;
        }

        // Lógica para el icono de reset
        if (this.estaEntre(mouseX, this.xIconReset, this.xIconReset + this.widthIconReset) &&
            this.estaEntre(mouseY, this.yIconReset, this.yIconReset + this.heightIconReset)) {
            this.reinciarJuego();
        }

        if (this.estaEntre(mouseX, this.xIconBack, this.xIconBack + this.widthIconBack) &&
            this.estaEntre(mouseY, this.yIconBack, this.yIconBack + this.heightIconBack)) {
            this.backPage();
        }
    }

    mouseUp(e) {
        this.estaAgarrando = false;
        const mouseX = this.getMousePos(e).x;

        const columna = this.tablero1.obtenerColumna(mouseX);
        if (columna !== -1) {
            this.fichaAgarrada.x = this.posIniX + columna * this.margenFichas;
            this.caerFicha(this.fichaAgarrada, columna);
        } else {
            this.fichaAgarrada.x = this.xIniFichaAgarrada;
            this.fichaAgarrada.y = this.yIniFichaAgarrada;
        }
        this.redibujarCanvas();
    }

    dibujar(e) {
        if (this.estaAgarrando) {
            const mouseX = this.getMousePos(e).x;
            const mouseY = this.getMousePos(e).y;

            this.fichaAgarrada.x = mouseX;
            this.fichaAgarrada.y = mouseY;

            let columna = this.tablero1.obtenerColumna(mouseX);
            this.dibujarFondo();
            if (columna > -1 && columna < this.columnas) {
                this.tablero1.dibujarTablero(columna, 1);
            } else {
                this.tablero1.dibujarTablero();
            }
            this.fichero.dibujarFichas();
            // this.dibujarIconBack();
            // this.dibujarIconReset(); titilan porque se van cargando las img
          
        }
    }

    getMousePos(event) {
        const rect = this.canvas.getBoundingClientRect(); // Obtiene el tamaño y posición del canvas
        return {
            x: Math.round(event.clientX - rect.left), 
            y: Math.round(event.clientY - rect.top)    
        };
    }
    

    mouseEnFicha(mouseX, mouseY) {
        for (const ficha of this.fichero.fichas) {
            if (ficha.enTablero) continue; // Omite las fichas que ya están en el tablero

            // Verifica si es el turno del jugador correspondiente
            
            if (ficha.color !== this.turnoJugador) continue;

            //console.log(`Ficha: (${ficha.x}, ${ficha.y}), Mouse: (${mouseX}, ${mouseY})`);
            
            const distanciaX = mouseX - ficha.x; 
            const distanciaY = mouseY - ficha.y ;
      
            //console.log(`Distancia: (${distanciaX} , ${distanciaY})`)
            const distanciaAlCentro = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY); //es la formula de distancia = raiz (x^2 + y^2)
            
            if (distanciaAlCentro <= this.radioFicha) {
                return ficha;
            }
        }
        return null;
    }

    estaEntre(numero, limiteInferior, limiteSuperior) {
        return numero >= limiteInferior && numero <= limiteSuperior;
    }



    dibujarFondo(){
        this.ctx.save();

        // Dibuja la imagen de fondo
        this.ctx.drawImage(this.background, 0, 0, this.width, this.height);

        // Añade un rectángulo negro semitransparente encima para crear el efecto de sombra
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Negro con 50% de opacidad
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Restaura el contexto a su estado anterior, eliminando la opacidad y el color negro
        this.ctx.restore();

        //sino tambien se pintan los circulos de negro
    }

    dibujarTurno() {
        this.ctx.save();
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Turno del jugador:`, this.xPosTurnoJugador, this.yPosTurnoJugador); // Dibuja el turno en la parte superior izquierda
        this.dibujarCirculo(this.xPosTurnoFicha, this.yPosTurnoFicha, this.turnoJugador);
        
    }

    dibujarCirculo(x , y, color){
        let colorFicha;
        if (color === "red"){
            colorFicha = "#FF4500";
        }else{
            colorFicha = "#00BFFF";
        }
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radioFicha-10, 0, 2 * Math.PI);  
        this.ctx.fillStyle = colorFicha;
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    dibujarIconReset() {
        this.iconReset.src = '../img/icon-reset-1.jpg';
    
        this.iconReset.onload = () => {
            this.ctx.save();
            this.ctx.drawImage(this.iconReset, this.xIconReset, this.yIconReset, this.widthIconReset, this.heightIconReset);
            this.ctx.restore();
        };
    }

    dibujarIconBack() {
        this.iconBack.src = '../img/icon-back-1.jpg';
    
        this.iconBack.onload = () => {
            this.ctx.save();
            this.ctx.drawImage(this.iconBack, this.xIconBack, this.yIconBack, this.widthIconBack, this.heightIconBack);
            this.ctx.restore();
        };
    }

    // dibujarBackgroundFicha() {
    //     return new Promise((resolve) => {
    //         this.ctx.save();
    //         this.backgroundFicha = new Image();
    //         this.backgroundFicha.src = '../img/background-ficha-1.png';
    
    //         this.backgroundFicha.onload = () => {
    //             this.ctx.drawImage(this.backgroundFicha, this.limiteBaseColumn, this.limiteBaseFila, this.margenFichas, this.margenFichas);
    //             this.ctx.restore();
    //             resolve(); // Resuelve la promesa cuando la imagen esté dibujada
    //         };
    //     });
    // }
    
    caerFicha(ficha, columna) {
        const yObjetivo = this.obtenerYObjetivo(columna); // Calcula la posición de caída

        // Verifica si yObjetivo es null (columna llena)
        if (yObjetivo === null) {
            return;
        }

        if (ficha.y < yObjetivo) {
            ficha.y += 30; // Ajusta la velocidad de caída

            this.redibujarCanvas();

            // Llama a la animación para el siguiente cuadro
            requestAnimationFrame(() => this.caerFicha(ficha, columna));
        } else {
            ficha.y = yObjetivo; // Ajusta la posición final si se pasa

            this.redibujarCanvas();
            // Marca la posición en el tablero como ocupada
            const filaObjetivo = Math.round((yObjetivo - this.posIniY) / this.margenFichas);
            
            this.tablero[filaObjetivo][columna] = ficha; // Marca esta posición como ocupada

            ficha.enTablero = true; // Marca la ficha como colocada en el tablero

                // Verificar ganador después de colocar la ficha
            let turnoGanador = this.turnoJugador;
            if (this.verificarGanador(this.nEnLinea)) {
                setTimeout(() => {
                    if(turnoGanador === 'red'){
                        this.terrorWin.play();
                    }else{
                        this.ctWin.play();
                    }
                    this.mostrarPopover(turnoGanador);
                    this.reinciarJuego();
                }, 100); // Le da un poco de tiempo para mostrar la posición final antes del alert
            }
            
            // Cambiar el turno después de colocar la ficha
            if (this.turnoJugador === "red") {
                this.turnoJugador = "blue";
            } else if (this.turnoJugador === "blue") {
                this.turnoJugador = "red";
            }

            this.dibujarRectangulo();
            this.dibujarTurno(this.turnoJugador); // Dibuja el turno actual después de limpiar
            
        }
    }

    //Funciona bien

    verificarGanador(nEnLinea) {
        // Revisa las filas
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col <= this.columnas - nEnLinea; col++) {
                let consecutivas = 0; // Contador de fichas consecutivas
                for (let i = 0; i < nEnLinea; i++) {
                    // Verifica si hay una ficha en la posición actual
                    if (this.tablero[fila][col + i] && this.tablero[fila][col + i].color === this.turnoJugador) {
                        consecutivas++;
                    } else {
                        break; // Si no es la misma ficha, rompe el bucle
                    }
                }
                // Si se han encontrado las fichas necesarias, retorna true
                if (consecutivas === nEnLinea) {
                    return true;
                }
            }
        }
    
        // Revisa las columnas
        for (let col = 0; col < this.columnas; col++) {
            for (let fila = 0; fila <= this.filas - nEnLinea; fila++) {
                let consecutivas = 0; // Contador de fichas consecutivas
                for (let i = 0; i < nEnLinea; i++) {
                    // Verifica si hay una ficha en la posición actual
                    if (this.tablero[fila + i][col] && this.tablero[fila + i][col].color === this.turnoJugador) {
                        consecutivas++;
                    } else {
                        break; // Si no es la misma ficha, rompe el bucle
                    }
                }
                // Si se han encontrado las fichas necesarias, retorna true
                if (consecutivas === nEnLinea) {
                    return true;
                }
            }
        }
    
        // Revisa diagonales (de izquierda a derecha)
        for (let fila = 0; fila <= this.filas - nEnLinea; fila++) {
            for (let col = 0; col <= this.columnas - nEnLinea; col++) {
                let consecutivas = 0; // Contador de fichas consecutivas
                for (let i = 0; i < nEnLinea; i++) {
                    // Verifica si hay una ficha en la posición actual
                    if (this.tablero[fila + i][col + i] && this.tablero[fila + i][col + i].color === this.turnoJugador) {
                        consecutivas++;
                    } else {
                        break; // Si no es la misma ficha, rompe el bucle
                    }
                }
                // Si se han encontrado las fichas necesarias, retorna true
                if (consecutivas === nEnLinea) {
                    return true;
                }
            }
        }
    
        // Revisa diagonales (de derecha a izquierda)
        for (let fila = 0; fila <= this.filas - nEnLinea; fila++) {
            for (let col = nEnLinea - 1; col < this.columnas; col++) {
                let consecutivas = 0; // Contador de fichas consecutivas
                for (let i = 0; i < nEnLinea; i++) {
                    // Verifica si hay una ficha en la posición actual
                    if (this.tablero[fila + i][col - i] && this.tablero[fila + i][col - i].color === this.turnoJugador) {
                        consecutivas++;
                    } else {
                        break; // Si no es la misma ficha, rompe el bucle
                    }
                }
                // Si se han encontrado las fichas necesarias, retorna true
                if (consecutivas === nEnLinea) {
                    return true;
                }
            }
        }
    
        return false; // Si no se ha encontrado un ganador, retorna false
    }

    dibujarRectangulo(){
        this.ctx.save();
        const heightRectangle = this.margenFichas;
        const widthRectangle = this.limiteBaseColumn;
        const x = 3;
        const y = this.height - heightRectangle - 2; //stroke


        // Dibujamos el cuadrado blanco
        this.ctx.fillStyle = '#4c593b';
        this.ctx.fillRect(x, y, widthRectangle, heightRectangle);

        // Línea superior en rojo
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#7b8773';
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + widthRectangle, y);
        this.ctx.stroke();

        // Línea izquierda en rojo
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#7b8773';
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + heightRectangle);
        this.ctx.stroke();

        // Línea derecha en negro
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#26321e';
        this.ctx.moveTo(x + widthRectangle, y);
        this.ctx.lineTo(x + widthRectangle, y + heightRectangle);
        this.ctx.stroke();

        // Línea inferior en negro
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#26321e';
        this.ctx.moveTo(x, y + heightRectangle);
        this.ctx.lineTo(x + widthRectangle, y + heightRectangle);
        this.ctx.stroke();
        this.ctx.restore();
    }

    redibujarCanvas(){
        this.limpiarCanvas();
        this.dibujarFondo();
        this.dibujarIconReset();
        this.dibujarIconBack();        
        this.tablero1.dibujarTablero();
        this.fichero.dibujarFichas();
    }

    obtenerYObjetivo(columna) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.tablero[fila][columna] === 0) { // Encuentra la primera fila vacía desde abajo
                // Calcula y devuelve la posición en píxeles de la fila vacía encontrada
                return this.posIniY + fila * this.margenFichas;
            }
        }
        return null; // Si la columna está llena, devuelve null para manejar ese caso
    }

    limpiarCanvas(){
        // Limpia el canvas antes de redibujar
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    reinciarJuego() {
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
        setTimeout(() => {
            this.recargarPag();
        }, 4000);
        
    
        // this.cancion.pause();
        // this.cancion.currentTime = 0;
        // this.ctWin.pause();
        // this.ctWin.currentTime = 0;
        // this.terrorWin.pause();
        // this.terrorWin.currentTime = 0;

        // this.eliminarEventos();

        // this.setearValoresIniciales();

        // this.tablero1.limpiar();
        // this.tablero = Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));

        // this.limpiarCanvas();

        // // Crear una nueva instancia del juego y guardarla en `this.juegoActual`
        // const canvasNuevo = document.getElementById("gameCanvas");
        // const ctxNuevo = canvasNuevo.getContext("2d");
        // const juegoNuevo = new Juego(
        //     canvasNuevo,
        //     ctxNuevo,
        //     this.width,
        //     this.height,
        //     `${this.nEnLinea} en linea`,
        //     this.filas,
        //     this.columnas,
        //     this.nEnLinea,
        //     this.radioFicha,
        //     this.margen
        // );

        // juegoNuevo.inicializarJuego();

        // location.reload();
    

    }

    eliminarEventos() {
        this.canvas.removeEventListener('mousedown', this.mouseDown);
        this.canvas.removeEventListener('mousemove', this.dibujar);
        this.canvas.removeEventListener('mouseup', this.mouseUp);
    }

    setearValoresIniciales(){
        for (let i = 0; i < this.fichero.fichas.length; i++) {
            const color = this.fichero.fichas[i].color; // Asumiendo que `color` es una propiedad de cada ficha en `fichero`

            if (color === "red") {
                this.fichero.fichas[i].x = this.posFichaTerror[this.nEnLinea].x
                this.fichero.fichas[i].y = this.posFichaTerror[this.nEnLinea].y
            } else if (color === "blue") {
                this.fichero.fichas[i].x = this.posFichaCounter[this.nEnLinea].x
                this.fichero.fichas[i].y = this.posFichaCounter[this.nEnLinea].y
            }
        }
    }

    recargarPag() {
        sessionStorage.setItem('forcedReload', 'true');

        // Crear un objeto con los datos del juego
        const datosJuego = {
            width: this.width,
            height: this.height,
            tipo: `${this.nEnLinea} en linea`,
            filas: this.filas,
            columnas: this.columnas,
            nEnLinea: this.nEnLinea,
            radioFicha: this.radioFicha,
            margen: this.margen,
            imagenCt: this.imagenCt.src,
            imagenTerror: this.imagenTerror.src
        };

        // Guardar el objeto en sessionStorage como JSON
        sessionStorage.setItem('datosJuego', JSON.stringify(datosJuego));
        location.reload();
    }

    backPage() {
        sessionStorage.setItem('backPage', 'true');

        // Crear un objeto con los datos del juego
        const datosJuego = {
            width: this.width,
            height: this.height,
            tipo: `${this.nEnLinea} en linea`,
            filas: this.filas,
            columnas: this.columnas,
            nEnLinea: this.nEnLinea,
            radioFicha: this.radioFicha,
            margen: this.margen,
            imagenCt: this.imagenCt.src,
            imagenTerror: this.imagenTerror.src
        };

        // Guardar el objeto en sessionStorage como JSON
        sessionStorage.setItem('datosJuego', JSON.stringify(datosJuego));
        location.reload();
    }

    mostrarPopover(turnoGanador){
        let ganador = "";
        if (turnoGanador === "red"){
            ganador = "TERRORIST WIN! - Equipo rojo";
        }else{
            ganador = "COUNTER TERRORIST WIN! - Equipo azul";
        }
        const popover = document.getElementById('popover-win');
        const mensaje = document.getElementById('popover-message-win');
        mensaje.textContent = ganador;
        popover.classList.add('visible');
    }
}