export class Tablero {
    constructor(filas, columnas, posIniX, posIniY, margenFichas, margenLineas, radioFicha, ctx){
        console.log(margenFichas);
        this.filas = filas;
        this.columnas = columnas;
        this.posIniX = posIniX;
        this.posIniY = posIniY;
        this.margenFichas = margenFichas;
        this.margenLineas = margenLineas;
        this.backgroundFicha = new Image();
        this.backgroundFicha.src = '../img/background-ficha-6.png';
        this.radioFicha = radioFicha;
        this.ctx = ctx;
        this.limiteBase = posIniX - radioFicha - margenLineas;
        this.matriz = [];
        this.colorLinea = "#FFD700";
        this.limiteBaseColumn = this.posIniX - this.radioFicha - this.margenLineas;
        this.limiteBaseFila = this.posIniY - this.radioFicha - this.margenLineas;
        this.inicializarMatriz();
    }

    dibujarTablero(columnaActual, opacidad) {
        let x = 0;
        let y = 0;
        let x1 = 0;
        let y1 = 0;
        for (let col = 0; col < this.columnas; col++) {
            // Dibujar los círculos en cada fila de la columna actual
            for (let row = 0; row < this.filas; row++) {
                x = this.posIniX + this.margenFichas * col;
                y = this.posIniY + this.margenFichas * row;
                x1 = this.limiteBaseColumn + this.margenFichas * col;
                y1 = this.limiteBaseFila + this.margenFichas * row;
                this.dibujarBackgroundFicha(x1, y1);
                this.dibujarCirculo(x, y, 0.1);
            }
    
            // Determinar el color de la línea para la columna actual
            const color = (col === columnaActual || col === columnaActual + 1) ? this.colorLinea : "white";
            this.dibujarLineaColumna(x, this.posIniY + this.margenFichas * (this.filas - 1), color);
        }

        // Línea adicional en la última columna
        let xFinal = this.posIniX + this.margenFichas * this.columnas;
        let yFinal = this.posIniY + this.margenFichas * (this.filas - 1);
        const colorFinal = (columnaActual === this.columnas - 1) ? this.colorLinea : "white";
        this.dibujarLineaColumna(xFinal, yFinal, colorFinal);
    }

    dibujarBackgroundFicha(x, y) {
        this.ctx.save();
        this.ctx.drawImage(this.backgroundFicha, x, y, this.margenFichas, this.margenFichas);
        this.ctx.restore();
    }
    
    

    dibujarLineaColumna(xCircle, yCircle, color) {
        const xLine = xCircle - this.radioFicha - this.margenLineas; 
        this.ctx.beginPath();
        this.ctx.moveTo(xLine, this.posIniY - this.radioFicha);
        this.ctx.lineTo(xLine, yCircle + this.radioFicha);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }



    dibujarCirculo(x, y, opacidad) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radioFicha, 0, 2 * Math.PI);  
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    inicializarMatriz(){
        for (let i = 0; i < this.filas; i++) {
            const fila = []; 
            for (let j = 0; j < this.columnas; j++) {
                fila.push(0); // Llenamos cada columna con un valor inicial 0
            }
            this.matriz.push(fila); // Agregamos la fila a la matriz
        }
    }

    obtenerPrimeraFilaVacia(columna) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.matriz[fila][columna] === 0) {
                return fila;
            }
        }
        return null; // Si la columna está llena
    }

    colocarFicha(fila, columna, jugador) {
        if (fila !== null && columna >= 0 && columna < this.columnas) {
            this.matriz[fila][columna] = jugador; // Marca la posición con el número del jugador (1 o 2)
        }
    }

    estaOcupada(fila, columna) {
        return this.matriz[fila][columna] !== 0;
    }

    imprimirTablero() {
        console.log("hola");
        console.table(this.matriz);
    }

    obtenerColumna(mouseX) {
        let columna = -1; // Inicializa columna como no válida
    
        // Calcula la cantidad de columnas dinámicamente
        const columnas = this.columnas; // Este valor debe estar definido según el juego (7, 8, 9, o 10 columnas)
    
        for (let i = 0; i < columnas; i++) {
            let limiteInferior = this.limiteBase + (i * this.margenFichas);
            let limiteSuperior = limiteInferior + this.margenFichas;
    
            if (mouseX >= limiteInferior && mouseX < limiteSuperior) {
                columna = i; // Asigna la columna correspondiente
                break; // Sale del bucle una vez que encuentra la columna
            }
        }
    
        return columna;
    }    
}